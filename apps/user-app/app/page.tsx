import { prisma } from "@repo/db";
 

export default async function Home() {

  const user = await prisma.user.findFirst({
    where : {
      email : "mri@gmail.com"
    }
  })

  return (
    <div className="h-screen w-screen bg-red-600 text-white font-sans text-5xl flex justify-center items-center">
      {user ? user.name : "Hii User"}
    </div>
  );
}
