import { PostListItemComponentComponent } from '../components/blog-view-component/post-list-component/post-list-item-component/post-list-item-component.component';
import { Post } from '../models/post.models';
import { Subject } from '../../../node_modules/rxjs';
import * as firebase from 'firebase';

export class BlogService{

    posts : Post[] = [];
    postSubject = new Subject<Post[]>();

    constructor(){
        this.getPosts();
    }

    likeIt(post : Post){
        post.like++;
        this.savePosts();
        this.emitPost();
    }

    dislikeIt(post : Post){
        post.dislike++;
        this.savePosts();
        this.emitPost();
    }

    emitPost(){
        this.postSubject.next(this.posts);
    }

    savePosts(){
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/posts').set(this.posts).then(
                    () => {
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    createPost(newPost : Post){
        this.posts.push(newPost);
        return this.savePosts();
    }

    removePost(post : Post){
        if(post.photo){
            const storageRef = firebase.storage().refFromURL(post.photo);
            storageRef.delete().then(
              () => {
                console.log('Photo supprimées');
              },
              (error) => {
                console.log('Impossible de supprimer la photo : ' + error);
              }
            );
        }

        const postIndexToRemove = this.posts.findIndex(
            (postEl) => {
                if(postEl === post){
                    return true;
                }
            } 
        );

        this.posts.splice(postIndexToRemove, 1);
        this.savePosts();
        this.emitPost();
    }

    getPosts(){
        firebase.database().ref('/posts').on('value',
            (dataSnapshoot) => {
                this.posts = dataSnapshoot.val() ? dataSnapshoot.val() : [];
                this.emitPost();
            }
        );
    }

    getSingleBook(id : number){
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/posts/' + id).once('value').then(
                    (dataSnapshoot) => {
                        resolve(dataSnapshoot.val());
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    uploadFile(file : File){
        return new Promise(
          (resolve, reject) => {
            const almostUniqueFileName = Date.now().toString();
            const upload = firebase.storage().ref().child('images/' + almostUniqueFileName + file.name).put(file);
            upload.on(firebase.storage.TaskEvent.STATE_CHANGED, 
              () => {
                console.log('Chargement...');
              },
              (error) => {
                console.log('erreur de chargement! : ' + error);
                reject();
              },
              () => {
                resolve(upload.snapshot.ref.getDownloadURL());
              }
            );
    
          }
        );
    }

}