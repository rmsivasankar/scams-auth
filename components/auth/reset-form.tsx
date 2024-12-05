"use client";

import React, { useState, useTransition } from 'react';
import { CardWrapper } from './card-wrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "../ui/form";
import * as z from "zod";
import { ResetSchema } from '@/schemas';
import { Input } from "../ui/input";
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { reset } from '@/actions/reset';

const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        console.log(values);

        startTransition(() => {
            reset(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error);
                    } else if (data?.success) {
                        setSuccess(data.success);
                    }
                })
                .catch((err) => {
                    setError("An error occurred. Please try again.");
                });
        });
    };

    return (
        <CardWrapper
            headerLabel='Forgot your Password'
            backButtonLabel='Back to Login'
            backButtonHref='/auth/login'
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit" className="w-full">
                        Send Reset Email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default ResetForm;
