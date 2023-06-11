import { Box, Button } from "@mui/material";
import { Form } from "formik";
import { Error, InputField, Label } from "../page/login";
import { Flex } from "../style/common";

const LoginForm = (props: { isSubmitting: boolean }) => {
    const { isSubmitting } = props;
  return (
    <Form style={{ marginTop: "12px" }}>
      <Box marginBottom={2}>
        <Label htmlFor="email">Email Address*</Label>
        <Box marginTop={1}>
          <InputField type="email" id="email" name="email" />
          <Error name="email" component="div" />
        </Box>
      </Box>

      <Box marginBottom={2}>
        <Label htmlFor="password">Password</Label>
        <Box marginTop={1}>
          <InputField type="password" id="password" name="password" />
          <Error name="password" component="div" />
        </Box>
      </Box>
      <Flex marginTop={2} marginBottom={2}>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "100%" }}
          disabled={isSubmitting}
        >
          Login
        </Button>
      </Flex>
    </Form>
  );
};

export default LoginForm;
