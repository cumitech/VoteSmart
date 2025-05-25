export const accessControlProvider = {
  can: async ({
    resource,
    action,
    params,
  }: {
    resource: any;
    action: any;
    params: any;
  }) => {
    const role = params?.role; // Get user from params

    if (!role) {
      return { can: false };
    }

    const permissions: any = {
      admin: {
        can: ["create", "edit", "delete", "show", "list"],
      },
      voter: {
        can: ["create", "edit", "show", "list"],
      },
      candidate: {
        can: ["show", "list"],
      },
    };

    // Check if the user has access to the resource and action
    const canAccess = permissions[role]?.can.includes(action) ?? false;
    console.log(
      `Role: ${role}, Resource: ${resource}, Action: ${action}, Can Access: ${canAccess}`)
    return { can: canAccess } as any;
  },
};
