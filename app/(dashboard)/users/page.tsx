"use client";
import { useState } from "react";
import useUserStore, { UserItem } from "../../stores/useUserStore";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
export default function Userpage() {
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();
  const {users, storeError, setSelectedUser} = useUserStore();
  async function handleClick(user :UserItem) {
  try{
    setIsLoading(true);
    setSelectedUser(user);
    await router.push(`/users/${user.name}`);
  }catch(error){
    setLocalError("Failed to load user details. Please try again.");
   setIsLoading(false);
  }
}
const activeError = localError || storeError;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" flex bg-gray-100 items-center justify-center flex-col h-screen opacity-50 text-black ">
    {activeError && (
      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded shadow-sm">
          <strong>Error:</strong> {activeError}
          <button 
            onClick={() => setLocalError(null)} 
            className="ml-4 font-bold"
          >
            ×
          </button>
        </div>
    )}
      <ul>
        {users.length === 0 ? <li> No user found </li> :
        users.map((user)=>(<li key={user.id} onClick={() => handleClick(user)}>{user.name}</li>))}
      </ul>
    </div>
  );
}
