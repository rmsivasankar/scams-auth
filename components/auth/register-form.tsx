"use client";

import React from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "../ui/form";
import * as z from "zod";
import { RegisterSchema } from '@/schemas';
import { Input } from "../ui/input"
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { register } from '@/actions/register';
import { useState, useTransition } from 'react';

const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name:"",
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }

  return (
    <CardWrapper 
    headerLabel='Create an account'
    backButtonLabel='Already Have an Account'
    backButtonHref='/auth/login'
    showSocial
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className="space-y-4">
                    <FormField 
                        control={form.control} 
                        name="name" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Name: 
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder='Sankar' />
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
                                <FormLabel>
                                    Email: 
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder='mail@google.com' type='email' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField 
                        control={form.control} 
                        name="password" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Password: 
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder='******' type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={isPending} type="submit" className="w-full">
                    Create an account
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default RegisterForm
