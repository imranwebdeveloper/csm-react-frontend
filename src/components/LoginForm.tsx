import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { loginUser } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ApiSingleResponse, AuthUser } from "@/types";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      return loginUser(values);
    },
  });

  return (
    <div className="container max-w-md mt-10 mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
            mutation.mutate(values, {
              onSuccess: (data: ApiSingleResponse<AuthUser>) => {
                login(data.data);
                toast.success("Login successful");
                resetForm();
                navigate({ pathname: "/login" });
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onError: (error: any) => {
                const errorMessage =
                  error?.response?.data?.message || "Invalid credentials";
                setErrors({ email: errorMessage });
                toast.error(errorMessage);
              },
              onSettled: () => {
                setSubmitting(false);
              },
            });
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className={
                      errors.email && touched.email ? "border-red-500" : ""
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    className={
                      errors.password && touched.password
                        ? "border-red-500"
                        : ""
                    }
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col mt-4 space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending || isSubmitting}
                >
                  {mutation.isPending || isSubmitting
                    ? "Logging in..."
                    : "Login"}
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="text-primary underline">
                    Register
                  </Link>
                </div>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
