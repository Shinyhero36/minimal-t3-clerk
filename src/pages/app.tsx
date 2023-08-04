import { api } from "@/utils/api";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();

  const { data: examples } = api.example.getAll.useQuery();
  const goHome = () => router.push("/");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-center text-5xl font-bold">
        If you see this page, its means you are authenticated
      </h1>
      {examples && (
        <>
          <span>Your data from DB</span>
          <ul>
            {examples.map((example) => (
              <li key={example.id}>{example.id}</li>
            ))}
          </ul>
        </>
      )}

      <SignOutButton signOutCallback={goHome} />
    </div>
  );
}
