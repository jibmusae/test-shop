import Link from "next/link";
import Footer from "../components/Footer";
import { Image, Box } from "@chakra-ui/react";

export default function SignLayout({ children }) {
  return (
    <>
      <Link href="/">
        <Image
          w="200px"
          m="2rem auto"
          cursor="pointer"
          src="image/logo_ydshop.png"
          alt="Logo Image"
        />
      </Link>
      <main>
        <Box
          w="500px"
          m="2rem auto"
          p="3rem"
          bg="white"
          boxShadow="md"
          color="#868e96" // GRAY 6
        >
          {children}
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
