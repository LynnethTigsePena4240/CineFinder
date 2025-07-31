import Image from "next/image";
import styles from "./page.module.css";
import SearchBar from "./components/SearchBar.js";

export default function Home() {
  return (
    <div>
      <div className={styles.title}>
        <h1>Welcome to CineFinder</h1>
        <Image src="/cinefinderlogo.png"
          width={70}
          height={70}
          alt="CineFinder Logo"
          style={{ objectFit: 'contain' }} />
      </div>
      <SearchBar />
    </div>
  );
}