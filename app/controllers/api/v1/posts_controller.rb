class Api::V1::PostsController < ApiController
	before_action :set_post, only: [:read]

	def read
		if @post.update(post_params)
			render json: { message: 'ok' }, status: :ok
		else
			render json: { message: @post.errors.full_messages }, status: :not_found
		end
	end

	private

	def set_post
		begin
			@post = Post.find_or_create_by(name_id: params[:post][:name_id])
		rescue
			render json: { message: 'Error from backend'}, status: :not_found
		end
	end

	def post_params
		params.require(:post).permit(:id, :name_id, :read)
	end
end