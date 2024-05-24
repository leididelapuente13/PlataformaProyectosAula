import { CommentForm } from '../../comments/commentform/CommentForm';
import { CommentCard } from '../../comments/commentcard/CommentCard';

export const CommentSection = () => {
	return (
		<div>
			<CommentForm />
            <CommentCard comment={{comment: 'jdjdjj'}}/>
		</div>
	);
};
