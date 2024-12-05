"use client"

import { useCurrentRole } from "@/hooks/use-current-role"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";

const AdminPage = () => {
    const role = useCurrentRole();
    return(
        <Card className="w-[600px] p-2">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        Administrator
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RoleGate allowedRole={UserRole.ADMIN}>
                        <FormSuccess message="You are allowed to see this" />
                    </RoleGate>
                </CardContent>
        </Card>
    )
}

export default AdminPage;