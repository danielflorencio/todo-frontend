import { Todo } from "./todo";

export type UserData = {
    firstName: string;
    lastName: string;
    email: string | null;
    password: string;
    todos?: Todo[];
}