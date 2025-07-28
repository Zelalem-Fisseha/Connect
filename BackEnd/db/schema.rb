# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_28_174324) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "applications", force: :cascade do |t|
    t.bigint "job_post_id", null: false
    t.bigint "job_seeker_profile_id", null: false
    t.string "cover_letter"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["job_post_id"], name: "index_applications_on_job_post_id"
    t.index ["job_seeker_profile_id"], name: "index_applications_on_job_seeker_profile_id"
  end

  create_table "employer_profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "company_name"
    t.string "company_description"
    t.string "location"
    t.string "industry"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_employer_profiles_on_user_id"
  end

  create_table "job_posts", force: :cascade do |t|
    t.bigint "employer_profile_id", null: false
    t.string "description"
    t.string "required_skills"
    t.integer "salary_min"
    t.integer "salary_max"
    t.integer "job_type"
    t.string "location"
    t.date "application_deadline"
    t.boolean "is_active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employer_profile_id"], name: "index_job_posts_on_employer_profile_id"
  end

  create_table "job_seeker_profiles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title"
    t.text "bio"
    t.integer "years_of_experience"
    t.text "skills"
    t.string "location"
    t.string "availability_status"
    t.string "resume_url"
    t.string "portfolio_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_job_seeker_profiles_on_user_id"
  end

  create_table "offers", force: :cascade do |t|
    t.bigint "job_post_id", null: false
    t.bigint "job_seeker_profile_id", null: false
    t.bigint "employer_profile_id", null: false
    t.integer "base_salary"
    t.string "benefits_description"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employer_profile_id"], name: "index_offers_on_employer_profile_id"
    t.index ["job_post_id"], name: "index_offers_on_job_post_id"
    t.index ["job_seeker_profile_id"], name: "index_offers_on_job_seeker_profile_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.integer "role", default: 0, null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "applications", "job_posts"
  add_foreign_key "applications", "job_seeker_profiles"
  add_foreign_key "employer_profiles", "users"
  add_foreign_key "job_posts", "employer_profiles"
  add_foreign_key "job_seeker_profiles", "users"
  add_foreign_key "offers", "employer_profiles"
  add_foreign_key "offers", "job_posts"
  add_foreign_key "offers", "job_seeker_profiles"
end
