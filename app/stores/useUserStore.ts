import { create } from "zustand";

const Userdata =[
    {id:1,name:"John Doe"},
    {id:2,name:"Jane Doe"},
    {id:3,name:"Max Smith"},
]
export interface UserItem{
    id: number;
    name: string;
}

// define store state and actions to update the state
interface UserState{
    selectedUser: UserItem | null;
    setSelectedUser: (user: UserItem | null)=> void;
    users: UserItem[];
    addUser: (user: UserItem) => void;
    removeUser: (id: number) => void;
    clearUsers: () => void;
    storeError: string | null;
    previousRouter: string | null;
}
const useUserStore= create<UserState>((set)=>({
    storeError:null,
    selectedUser: null,
    previousRouter: null,
    setSelectedUser: (user)=> set({selectedUser: user}),
    users: Userdata,
    addUser: (user) => set((state) => ({users: [...state.users, user]})),
    removeUser: (id) => set((state) => ({users: state.users.filter(user => user.id !== id)})),
    clearUsers: () => set({users: []}),
}));

export default useUserStore;