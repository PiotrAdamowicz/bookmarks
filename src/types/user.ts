export type User = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    hash: string;
    firstName: string;
    lastName: string;
    bookmarks: string[];
};
