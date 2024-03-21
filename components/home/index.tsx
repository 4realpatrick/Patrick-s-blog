import Intro from "./intro";
import Habbit from "./habbit";
import Link from "next/link";
const Home = () => {
  let photos = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <>
      <Intro />
      <Habbit />
      <div className="flex gap-4">
        {photos.map((id) => (
          <Link
            className="size-10 bg-primary"
            key={id}
            href={`/article/${id}`}
            passHref
          >
            {id}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
