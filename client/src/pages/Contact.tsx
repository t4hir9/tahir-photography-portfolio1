import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { useContactForm } from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram, Twitter } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const mutation = useContactForm();

  const form = useForm({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. I'll get back to you shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
              GET IN <span className="text-white/30">TOUCH</span>
            </h1>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              Available for freelance projects, collaborations, and commercial work worldwide. Let's create something memorable together.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:abdultahir779@gmail.com" className="text-white text-lg hover:text-white/70 transition-colors">
                    abdultahir779@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone className="text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Phone</p>
                  <a href="tel:+2348148630882" className="text-white text-lg hover:text-white/70 transition-colors">
                    +234 814 863 0882
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="text-white" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white text-lg">Abuja, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-white/40 mb-4 text-sm">Follow my journey</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/iamt4hir9" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/60 transition-colors"><Instagram /></a>
                <a href="https://twitter.com/iamt4hir9" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/60 transition-colors"><Twitter /></a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 p-8 md:p-12 rounded-sm border border-white/10"
          >
            <h3 className="text-2xl font-display text-white mb-8">Send a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          {...field} 
                          className="bg-black/20 border-white/10 text-white h-12 focus:border-white/40"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          {...field} 
                          className="bg-black/20 border-white/10 text-white h-12 focus:border-white/40"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/60">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="min-h-[150px] bg-black/20 border-white/10 text-white resize-none focus:border-white/40"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full h-14 bg-white text-black hover:bg-white/90 font-medium tracking-wide text-lg rounded-none"
                >
                  {mutation.isPending ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
