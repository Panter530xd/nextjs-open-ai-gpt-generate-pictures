import { Post } from "@prisma/client";

export type TUserInput = {
	title: string;
	tag: string;
	description: string;
};

export type ImagePreviewProps = {
	imageUrl: string;
	isLoading: boolean;
};

export type userInputsProps = {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	userInputs: TUserInput;
	setUserInputs: React.Dispatch<React.SetStateAction<TUserInput>>;
	isLoading: boolean;
};

export type GalleryProps = {
	posts: Post[];
};