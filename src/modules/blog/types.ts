/**
 * Blog API Types
 * Based on API documentation from manager.test-domain.co
 */

/**
 * Blog Category
 */
export interface BlogCategory {
  id: string;
  name: string;
  slug: string | null;
  blog_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Blog Read (List/Detail)
 */
export interface Blog {
  id: string;
  slug: string | null;
  title: string;
  cover_image: string | null;
  small_description: string;
  description: string;
  meta_title: string;
  meta_description: string;
  category: BlogCategory;
  review_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * User Profile for Blog Review
 */
export interface SafeUserProfile {
  profile_image?: string;
  gender?: 'M' | 'F';
  education_level?: string;
  actual_address?: string;
  registered_address?: string;
  birth_place?: string;
  id_card_series?: string;
  id_card_number?: string;
  driver_license_series_and_number?: string;
  driver_license_category?: string;
}

/**
 * Safe User for Blog Review
 */
export interface SafeUser {
  id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  father_name?: string;
  roles?: string;
  is_email_verified?: boolean;
  profile?: SafeUserProfile;
}

/**
 * Blog Review
 */
export interface BlogReview {
  id: string;
  user_detail: SafeUser;
  blog: string;
  message: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Blog Review Create Request
 */
export interface BlogReviewCreateRequest {
  user_detail: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    father_name?: string;
    is_email_verified?: boolean;
    profile?: SafeUserProfile;
  };
  blog: string;
  message: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Paginated API Response
 */
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Blog List Query Parameters
 */
export interface BlogListParams {
  category?: string;
  ordering?: string;
  search?: string;
  page?: number;
  page_size?: number;
}
