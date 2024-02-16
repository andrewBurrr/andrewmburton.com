import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface User {
    firstname: string;
    lastname: string;
    profession: string;
    imageUrl: string;
}

export interface CardElement {
    title: string;
    thumbnailURL: string;
    description: string;
    tags: string[];
    createdAt?: Timestamp;
}

export interface Project extends CardElement {
    thumbnail?: File,
    content: string,
    repository: string,
    video: string,
    report?: File,
    reportURL: string,
    isFeatured: boolean,
    authorId?: string,
}

export interface Post extends CardElement {
    thumbnail?: File,
    content: string,
    authorId?: string,
}

export interface Lead {
    name: string,
    inquiry: string,
    email: string,
}