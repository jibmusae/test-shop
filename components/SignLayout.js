import Link from "next/link";
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
      <Box w="350px" m="1rem auto" d="flex" flexDirection="column">
        {children}
      </Box>
    </>
  );
}
