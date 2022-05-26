import { create } from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';


class apiDetails {
    static tokenMain = "";
    static baseURLs = 'https://pixbrand.agency/housetripping';
    static publicImage = apiDetails.baseURLs + '/public/';
    static publicVideo = apiDetails.baseURLs + '/public/challenge_videos/';
    constructor(token = "123456") {
        apiDetails.tokenMain = token;
    }

    getClient(token) {
        if (token) {
            apiDetails.tokenMain = token;

        }
        else { token = "" }
        var api = create({
            baseURL: 'https://pixbrand.agency/housetripping',
            headers: {
                Accept: 'application/json',
                Authorization: "Bearer " + token
            },
        });
        return api;
    }

    api = this.getClient(apiDetails.tokenMain)

    mobileCodes = '/api/getmobilecodes';
    checkMobile = 'api/checkmobile';
    verifyOTP = 'api/verifyotp';
    checkMail = 'api/checkemail';
    checkusername = 'api/checkusername';
    registration = 'api/registration';
    forgetPassword = 'api/forgetPassword';

    login = 'api/login';
    socialLogin = 'api/socialLogin';
    getsocialLoginDetails = 'api/getsocialLoginDetails';
    updateProfile = 'api/updateProfile';
    getuserslist = 'api/getuserslist';
    searchusers = 'api/searchusers';
    get_songs = 'api/get_song';
    create_challenge = 'api/create_challenge';
    solo_challenge = "api/get_solo_challenge";
    get_group_challenge = 'api/get_group_challenge';
    get_home_feeds = "api/get_home_feeds";
    get_challengeByID = "api/get_challengeByID";
    challenge_Notifications = "api/challengeNotifications";
    activity_Notifications = "api/activityNotifications";
    getuserByID = "api/getuserByID";
    addfriend = "api/addfriend";
    addfollower = "api/addfollower";
    songcategory = "api/getcategory";
    userupdatecategory = "api/updateUserCategory";
    profle_image = "api/upload_song";
    contact_information = "api/contactInformation";
    submit_ContactUs = "api/submitContactUs";
    get_songById = "api/get_songByID";
    get_following_list = "api/getfollowinglist";
    get_follower_list = "api/getfollowerlist";
    get_user_detail = 'api/getuserByID';
    get_user_details_by_id = 'api/get_user_details_by_id';
    post_profile_image = 'api/profileimageUpdate';
    post_add_follower = "api/addfollower";
    post_add_following = "api/addfollowing";
    add_post = "api/add_post";
    all_user_list = "api/allUserList";
    report_user_api = "api/reportUser";
    deletePost = "api/deletePost";
    postLike = "api/post_like";
    getComments = "api/get_comments";
    commentLike = "api/comment_like";
    addComment = "api/add_comment";
    delete_comment = "api/delete_comment";
    sharePost = "api/sharePost";
    sendMessageNotification = "api/sendMessageNotification";
    connectSocialAccount = "api/connectSocialAccount";
}

export default apiDetails;