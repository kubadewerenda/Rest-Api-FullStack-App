import { Box } from "@chakra-ui/react";

const DividerLine = ({  height = "1px", color = "yellow.200", mt = "30px" }) => {
  return (
    <Box
      _after={{
        content: '""',
        display: "block",
        borderRadius: "md",
        maxWidth: "100vh",
        width: {base:"300px",md:"100vh"},
        height: height,
        bg: color,
        margin: `${mt} auto 0`,
        mb:"30px"
      }}
    />
  );
};

export default DividerLine;