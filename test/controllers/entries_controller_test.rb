require 'test_helper'

class EntriesControllerTest < ActionDispatch::IntegrationTest
  test "should get top" do
    get entries_top_url
    assert_response :success
  end

end
