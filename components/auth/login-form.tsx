"use client";

import React from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "../ui/form";
import * as z from "zod";
import { LoginSchema } from '@/schemas';
import { Input } from "../ui/input"
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '@/actions/login';
import { useTransition } from 'react';

const LoginForm = () => {

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values);
        });
    }

  return (
    <CardWrapper 
    headerLabel='Welcome Back'
    backButtonLabel='Dont Have an Account'
    backButtonHref='/auth/register'
    showSocial
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className="space-y-4">
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
                <FormError message='' />
                <FormSuccess message="" />
                <Button disabled={isPending} type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

export default LoginForm
