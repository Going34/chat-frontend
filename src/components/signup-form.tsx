import { Box, Button } from "@mui/material";
import { Field, Form } from "formik";
import { Error, InputField, Label } from "../page/login";
import { Flex } from "../style/common";
import axios from "axios";


const SignupForm = (props: {
  isSubmitting: boolean;
  setFieldValue:  (field: string, value: unknown, shouldValidate?: boolean | undefined) => void

}) => {
  const { isSubmitting, setFieldValue } = props;


  return (
    <Form style={{ marginTop: "12px" }}>
      <Box>
        <Label htmlFor="email">Email Address*</Label>
        <Box marginTop={1}>
          <InputField type="email" id="email" name="email" />
          <Error name="email" component="div" />
        </Box>
      </Box>

      <Box>
        <Label htmlFor="name">Name*</Label>
        <Box marginTop={1}>
          <InputField type="name" id="name" name="name" />
          <Error name="name" component="div" />
        </Box>
      </Box>

      <Box>
        <Label htmlFor="phonenumber">PhoneNumber*</Label>
        <Box marginTop={1}>
          <InputField type="text" id="phonenumber" name="phonenumber" />
          <Error name="phonenumber" component="div" />
        </Box>
      </Box>

      <Box>
        <Label htmlFor="password">Password</Label>
        <Box marginTop={1}>
          <InputField type="password" id="password" name="password" />
          <Error name="password" component="div" />
        </Box>
      </Box>
      <Box>
        <Label htmlFor="confirmpassword">ConfirmPassword</Label>
        <Box marginTop={1}>
          <InputField
            type="confirmpassword"
            id="confirmpassword"
            name="confirmpassword"
          />
          <Error name="confirmpassword" component="div" />
        </Box>
      </Box>
      <Box>
        <Label htmlFor="file">Upload File</Label>
        <Box>
          <Field
            type="file"
            id="file"
            name="file"
            onChange={(event: { currentTarget: { files: unknown[] } }) => {
              const file = event.currentTarget.files[0];
              setFieldValue("file", file);
            }}
          />
          <Error name="file" component="div" />
        </Box>
      </Box>
      <Flex marginTop={2} marginBottom={2}>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "100%" }}
          disabled={isSubmitting}
        >
          Signup
        </Button>
      </Flex>
    </Form>
  );
};

export default SignupForm;
