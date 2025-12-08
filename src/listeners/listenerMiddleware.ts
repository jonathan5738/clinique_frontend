import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../types";
import { apiSlice } from "../api";

export const listenerMiddleware = createListenerMiddleware();
export const startAppListening = listenerMiddleware.startListening
.withTypes<RootState, AppDispatch>();

export type AppStartListening = typeof startAppListening;

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();
export type AppAddListener = typeof addAppListener;

listenerMiddleware.startListening({
        matcher: apiSlice.endpoints.addNewDoctor.matchFulfilled,
        effect: async (_, listenerApi) => {
            const {toast} = await import("react-tiny-toast");
            const toastId = toast.show("Doctor successfully added", {
                variant: "success",
                position: "top-center",
                pause: true
            })

            await listenerApi.delay(3600);
            toast.remove(toastId);
        }
});

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.addNewDoctor.matchRejected,
    effect: async(_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Unable to register doctor", {
            variant: "danger",
            position: "top-center",
            pause: true
        })
        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
})
listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.updateDoctor.matchFulfilled,
    effect: async(_, listenerApi) => {
        const {toast} = await import ("react-tiny-toast");
        const toastId = toast.show("Doctor successfullty updated", {
            variant: "success",
            position: "top-center",
            pause: true
        });
        await listenerApi.delay(3600);
        toast.remove(toastId);
    }
})

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.addNewEvent.matchFulfilled,
    effect: async (_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Event successfully added", {
            variant: "success",
            position: "top-center",
            pause: true
        })
        await listenerApi.delay(3600);
        toast.remove(toastId);
    }
});

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.addNewDoctor.matchRejected,
    effect: async (_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Event unable to be added", {
            variant: "danger",
            position: "top-center",
            pause: true
        })
        await listenerApi.delay(3600);
        toast.remove(toastId);
    }
})
listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.updateDoctorDepartment.matchFulfilled,
    effect: async (_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Department successfully updated", {
            variant: "success",
            position: "top-center",
            pause: true
        });
        await listenerApi.delay(3600);
        toast.remove(toastId);
    }
})
listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.updateDoctor.matchRejected,
    effect: async(_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Unable to update doctor", {
            variant: "danger",
            position: "top-center",
            pause: true
        })
        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
})

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.createDepartment.matchFulfilled,
    effect: async (_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Department enregistrer avec succès", {
            variant: "success",
            position: "top-center",
            pause: true
        })
        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
});

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.createDepartment.matchRejected,
    effect: async(_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Une error s'est produite, impossible d’enregistrer le medecin", {
            variant: "danger",
            position: "top-center",
            pause: true
        })
        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
});

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.addNewBlogPost.matchFulfilled,
    effect: async (_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Publication enregistrer avec succès", {
            variant: "success",
            position: "top-center",
            pause: true
        });
        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
})

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.addNewBlogPost.matchRejected,
    effect: async(_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Une error s'est produite, impossible d’enregistrer la publication", {
            variant: "danger",
            position: "top-center",
            pause: true
        })

        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
})

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.deleteEvent.matchFulfilled,
    effect: async (_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Evenement supprimer avec succès", {
            variant: "success",
            position: "top-center",
            pause: true
        });
        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
})

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.deleteEvent.matchRejected,
    effect: async (_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Impossible de supprimer avec succès", {
            variant: "danger",
            position: "top-center",
            pause: true
        });
        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
})




listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.addNewMessage.matchFulfilled,
    effect: async (_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Message envoyer avec succès", {
            variant: "success",
            position: "top-center",
            pause: true
        });
        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
})

listenerMiddleware.startListening({
    matcher: apiSlice.endpoints.addNewMessage.matchRejected,
    effect: async (_, listenerApi) => {
        const {toast} = await import("react-tiny-toast");
        const toastId = toast.show("Impossible d'envoyer le message", {
            variant: "danger",
            position: "top-center",
            pause: true
        });
        await listenerApi.delay(4000);
        toast.remove(toastId);
    }
})