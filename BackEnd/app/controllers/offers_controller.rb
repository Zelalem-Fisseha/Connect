class OffersController < ApplicationController
  before_action :set_offer, only: [:show, :update, :destroy]
  before_action :set_job_post, only: [:index, :create]


  def index
    render json: @job_post.offers
  end

 
  def create
    offer = @job_post.offers.build(offer_params)
    if offer.save
      render json: offer, status: :created
    else
      render json: offer.errors, status: :unprocessable_entity
    end
  end

  
  def show
    render json: @offer
  end

 
  def update
    if @offer.update(offer_params)
      render json: @offer
    else
      render json: @offer.errors, status: :unprocessable_entity
    end
  end

 
  def destroy
    @offer.destroy
    head :no_content
  end

  private

  def set_offer
    @offer = Offer.find(params[:id])
  end

  def set_job_post
    @job_post = JobPost.find(params[:job_post_id]) if params[:job_post_id]
  end

  def offer_params
    params.require(:offer).permit(:job_seeker_profile_id, :employer_profile_id, :base_salary, :benefits_description, :status)
  end
end
