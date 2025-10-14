import { Github, User, Mail, Lock, Phone, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useRegister from "@/hooks/useRegister";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  job: z.string().min(2, "Job title must be at least 2 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;
export default function SignUpForm() {

  const { mutate: signup, isPending } = useRegister();


  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      job: "",
    },
  });


  const onSignupSubmit: SubmitHandler<SignupFormValues> = (values) => {
    signup(values);
  };

  return (
    <>
         <Form {...signupForm}>
                    <form
                      onSubmit={signupForm.handleSubmit(
                        onSignupSubmit as SubmitHandler<SignupFormValues>
                      )}
                      className="space-y-4"
                    >
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={signupForm.control}
                          name="first_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="First name"
                                    className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signupForm.control}
                          name="last_name"
                          render={({ field }) => (
                            <FormItem>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Last Name"
                                    className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Username */}
                      <FormField
                        control={signupForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Username"
                                  className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email */}
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="E-mail"
                                  className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone */}
                      <FormField
                        control={signupForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="Phone Number"
                                  className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Job */}
                      <FormField
                        control={signupForm.control}
                        name="job"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Job Title"
                                  className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password */}
                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="password"
                                  className="rounded-full pl-10 h-12 border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                  {...field}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Sign Up Button */}
                      <Button
                        type="submit"
                        className="w-full rounded-full h-12 text-base font-medium"
                      >
                        {isPending ? "Signing up..." : "Sign up"}
                      </Button>

                      {/* Divider */}
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-blue-50 text-gray-500">
                            Or
                          </span>
                        </div>
                      </div>

                      {/* GitHub Button */}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-full h-12 text-base font-medium bg-black text-white hover:text-white hover:bg-gray-700 border-black"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        Sign up with GitHub
                      </Button>
                    </form>
                  </Form>
    </>
  )
}
