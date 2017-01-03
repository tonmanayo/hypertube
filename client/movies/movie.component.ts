import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserServices} from "../services/user.services";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Component({
    selector: 'my-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent{
    private id;
    private type;
    private fav = {id: -1, value: false};
    private watch = {id: -1, value: false};
    private like = {id: -1, value: false};
    private user;
    private details;
    private casts = [];
    private images = [];
    private genres = [];
    private reviews = [];

    constructor(private router: ActivatedRoute, private userservices: UserServices,
                    private http: Http){
        this.user = this.userservices.getUser();
        this.router.params.subscribe(
            params => {
                this.id = +params['id'];
                this.type = params['type'];
                console.log("type: "+this.type);
                console.log("id "+this.id);
                this.myInit(this.id);
                if (this.type == "movie"){
                    this.getMovieDetails();
                }else{
                    this.getSeriesDetails()
                }
            }
        );
    }

    getMovieDetails(){
        this.http.get("http://localhost:4000/movies/movie?id="+this.id)
            .map(data => data.json())
            .catch(error => Observable.throw(error.json()))
            .subscribe(
                data => {
                    console.log(data);
                    this.details = data.details;
                    this.genres = data.genres;
                }
            );
    }

    getSeriesDetails(){
        this.http.get("http://localhost:4000/movies/series?id="+this.id)
            .map(data => data.json())
            .catch(error => Observable.throw(error.json()))
            .subscribe(
                data => {
                    console.log(data);
                    this.details = data.details;
                    this.genres = data.genres;
                }
            );
    }

    getMovieReviews(){
    }

    isFound(val, id, list){
        for (let i = 0; i < list.length; i++){
            if (list[i].id == id && list[i].type === "movie"){
                val.id = i;
                val.value = true;
                return ;
            }
        }
        val.id = -1;
        val.value = false;
    }

    myInit(id){
        this.isFound(this.fav, id, this.user.favList);
        this.isFound(this.watch, id, this.user.watchList);
        this.isFound(this.like, id, this.user.likeList);
    }

    onFav(){
        if (this.fav.value){
            this.user.favList.splice(this.fav.id, 1);
            this.fav.value = false;
            this.fav.id = -1;
        }else{
            this.user.favList.push(this.details);
            this.fav.value = true;
            this.fav.id = this.user.favList.length - 1;
        }
        this.userservices.savedetails(this.user)
            .subscribe(
                res =>{
                    this.user = this.userservices.getUser();
                },
                error => {
                    console.log("error");
                }
            );
    }

    onWatch(){
        if (this.watch.value){
            this.user.watchList.splice(this.watch.id, 1);
            this.watch.value = false;
            this.watch.id = -1;
        }else{
            this.user.watchList.push(this.details);
            this.watch.value = true;
            this.watch.id = this.user.watchList.length - 1;
        }
        this.userservices.savedetails(this.user)
            .subscribe(
                res =>{
                    this.user = this.userservices.getUser();
                },
                error => {
                    console.log("error");
                }
            );
    }

    onLike(){
        console.log("like clicked");
        if (this.like.value){
            this.user.likeList.splice(this.like.id, 1);
            this.like.value = false;
            this.like.id = -1;
        }else{
            this.like.value = true;
            this.like.id = this.user.likeList.length - 1;
            this.user.likeList.push(this.details);
        }
        this.userservices.savedetails(this.user)
            .subscribe(
                res =>{
                    this.user = this.userservices.getUser();
                },
                error => {
                    console.log("error");
                }
            );
    }
}