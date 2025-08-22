export type Bookmark = {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    title: string;
    description: string;
    link: string;

    userId: number;
    user: any;
};

export type UrlProps = {
    home: string;
    login: string;
    bookmarks: string;
};
