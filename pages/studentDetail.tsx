import { useRouter } from "next/router";

export default function studentDetail() {
  const router = useRouter();
  console.log(router.asPath);
  console.log(router.asPath.slice(9));
  console.log(parseInt(router.asPath.slice(9)));
  const stuId: number = parseInt(router.asPath.slice(9));
  return <h2>student id : {stuId}</h2>;
}
