class JobPostsController < ApplicationController
  def index
    @job_posts = JobPost.all
    render json: @job_posts, status: :ok
  end
  def show
    @job_post = JobPost.find(params[:id])
    if @job_post
      render json: @job_post
    else
      render json: { error: 'Job post not found' }, status: :not_found
    end
  end
  def create
    @job_post = JobPost.new(job_post_params)

    if @job_post.save
      render json: @job_post, status: :created, location: @job_post
    else
      render json: @job_post.errors, status: :unprocessable_entity
    end
  end
  def update
    @job_post = JobPost.find(params[:id])

    if @job_post.update(job_post_params)
      render json: @job_post
    else
      render json: @job_post.errors, status: :unprocessable_entity
    end
  end
  def destroy
    @job_post = JobPost.find(params[:id])

    if @job_post
      @job_post.destroy
      head :no_content
    else
      render json: { error: 'Job post not found' }, status: :not_found
    end
  end
  private
  def job_post_params
    params.require(:job_post).permit(
      :employer_profile_id,
      :description,
      :required_skills,
      :salary_min,
      :salary_max,
      :job_type,
      :location,
      :application_deadline,
      :is_active
    )
  end
end
