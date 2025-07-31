import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.title}>
      <h1>Welcome to CineFinder</h1>
      <Image src="/cinefinderlogo.png"
      width={70}
      alt="CineFinder Logo"
      height={70}
      style={{ objectFit: 'contain' }}
      />
      </div>


    </div>
  );
}