"use client";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    // for whatever reason "FormControl" referenced by the "Form" key
    Form: {
      baseStyle: {
        container: {
          marginBottom: 5,
        },
      },
    },
  },
});

export default theme;