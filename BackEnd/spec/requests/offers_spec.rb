require 'rails_helper'

RSpec.describe "Offers", type: :request do
  let!(:job_post) { create(:job_post) }
  let!(:offer) { create(:offer, job_post: job_post) }

  describe "GET /job_posts/:job_post_id/offers" do
    it "returns offers for a job post" do
      get job_post_offers_path(job_post_id: job_post.id)
      expect(response).to have_http_status(:success)
      expect(response.body).to include(offer.id.to_s)
    end
  end

  describe "POST /job_posts/:job_post_id/offers" do
    it "creates an offer for a job post" do
      post job_post_offers_path(job_post_id: job_post.id), params: {
        offer: {
          # ...offer attributes...
        }
      }
      expect(response).to have_http_status(:created)
      # Add more expectations as needed
    end
  end
  describe "GET /offers/:id" do
  let!(:offer) { create(:offer) }

  it "shows a single offer" do
    get offer_path(offer.id)
    expect(response).to have_http_status(:success)
    expect(response.body).to include(offer.id.to_s)
  end
end

describe "PATCH /offers/:id" do
  let!(:offer) { create(:offer) }

  it "updates an offer" do
    patch offer_path(offer.id), params: { offer: { status: 1 } }
    expect(response).to have_http_status(:success)
    # Add more expectations as needed
  end
end

describe "DELETE /offers/:id" do
  let!(:offer) { create(:offer) }
  it "deletes an offer" do
    delete offer_path(offer.id)
    expect(response).to have_http_status(:no_content) # or :success
    expect(Offer.exists?(offer.id)).to be_falsey
  end
end
end