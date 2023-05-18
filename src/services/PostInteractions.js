import { useRouter } from "next/router";
import http from "./http";

export const useHandleLike = (id) => {
	const router = useRouter();
	http.put(`posts/like/${id}`).then((response) => router.push(router));
};

export const useHandleBookmark = (id) => {
    const router = useRouter();
	http.put(`posts/bookmark/${id}`).then((response) => router.push(router));
};
