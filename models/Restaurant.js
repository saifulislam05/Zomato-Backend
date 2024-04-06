import mongoose from "mongoose";

const cuisineSchema = new mongoose.Schema({
  deeplink: String,
  url: String,
  name: String,
});

const ratingBgColorV2Schema = new mongoose.Schema({
  type: String,
  tint: String,
});

const ratingTypeSchema = new mongoose.Schema({
  rating_type: String,
  rating: String,
  reviewCount: String,
  reviewTextSmall: String,
  subtext: String,
  color: String,
  ratingV2: String,
  subtitle: String,
  sideSubTitle: String,
  bgColorV2: ratingBgColorV2Schema,
  newOnDelivery: Boolean,
});

const ratingNewSchema = new mongoose.Schema({
  newlyOpenedObj: mongoose.Schema.Types.Mixed,
  suspiciousReviewObj: mongoose.Schema.Types.Mixed,
  ratings: {
    DINING: ratingTypeSchema,
    DELIVERY: ratingTypeSchema,
  },
});

const ratingSchema = new mongoose.Schema({
  has_fake_reviews: Number,
  aggregate_rating: String,
  rating_text: String,
  rating_subtitle: String,
  rating_color: String,
  votes: String,
  subtext: String,
  is_new: Boolean,
});

const localitySchema = new mongoose.Schema({
  name: String,
  address: String,
  localityUrl: String,
});

const timingSchema = new mongoose.Schema({
  text: String,
  color: String,
});

const costTextSchema = new mongoose.Schema({
  text: String,
});

const restaurantInfoSchema = new mongoose.Schema({
  resId: Number,
  name: String,
  image: { url: String },
  o2FeaturedImage: { url: String },
  rating: ratingSchema,
  ratingNew: ratingNewSchema,
  cft: costTextSchema,
  cfo: costTextSchema,
  locality: localitySchema,
  timing: timingSchema,
  cuisine: [cuisineSchema],
  should_ban_ugc: Boolean,
  costText: costTextSchema,
});

const actionInfoSchema = new mongoose.Schema({
  text: String,
  clickUrl: String,
  clickActionDeeplink: String,
});

const bulkOfferColorSchema = new mongoose.Schema({
  tint: String,
  type: String,
});

const bulkOfferSchema = new mongoose.Schema({
  text: String,
  color: bulkOfferColorSchema,
});

const bottomContainerImageSchema = new mongoose.Schema({
  url: String,
});

const bottomContainerSchema = new mongoose.Schema({
  image: bottomContainerImageSchema,
  text: String,
});

const trackingDataSchema = new mongoose.Schema({
  table_name: String,
  payload: String,
  event_names: mongoose.Schema.Types.Mixed,
});

const restaurantSchema = new mongoose.Schema({
  type: { type: String, default: "restaurant" },
  info: restaurantInfoSchema,
  order: {
    deliveryTime: String,
    isServiceable: Boolean,
    hasOnlineOrdering: Boolean,
    actionInfo: actionInfoSchema,
  },
  gold: [String],
  takeaway: [String],
  cardAction: actionInfoSchema,
  distance: String,
  isPromoted: Boolean,
  promotedText: String,
  trackingData: [trackingDataSchema],
  allCTA: [mongoose.Schema.Types.Mixed],
  promoOffer: String,
  checkBulkOffers: Boolean,
  bulkOffers: [bulkOfferSchema],
  isDisabled: Boolean,
  bottomContainers: [bottomContainerSchema],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
