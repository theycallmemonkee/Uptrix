---
title: "ChatGPT Ads Pricing and Bidding Explained (2026)"
date: "2026-09-17"
excerpt: "How ChatGPT ads pricing works: CPM, CPC and conversion bidding, OpenAI's $3 to $5 starting bid, daily budget rules, billing, and settings you can't change."
cover: "/blogs/chatgpt-ads/chatgpt-ads-pricing-bidding.webp"
author: "Uptrix Editorial Team"
category: "Paid Media"
takeaways:
  - "There is no fixed price. Costs come from an auction."
  - "You pay per 1,000 impressions or per valid click, never per conversion."
  - "OpenAI suggests a $3 to $5 starting maximum bid for click campaigns."
  - "Minimum daily budgets depend on your billing currency: $25 for USD accounts, ₹725 for INR."
  - "Daily budgets are seven-day averages, so one day can spend double."
  - "Some settings can't be changed after launch."
---

insight: ChatGPT ads have no rate card. You set a budget and a maximum bid, and OpenAI runs a relevance-weighted auction, so a more relevant ad can compete without simply bidding more. You pay per 1,000 views or per click, never per conversion. For click campaigns, OpenAI's Help Center recommends starting with a maximum bid of $3 to $5 per click.

## The problem

"How much do ChatGPT ads cost?" is the first question founders ask, and most figures online come from agency accounts, not OpenAI. This guide covers only what OpenAI documents.

## The short answer

ChatGPT ads cost whatever the auction decides, within limits you set. You choose an objective (views, clicks or conversions), a budget, and a bid. OpenAI then picks which ad to show using a relevance-weighted, second-price auction. You're billed per 1,000 impressions or per valid click, depending on your settings.

New to ChatGPT ads? Start with our main guide: [ChatGPT Ads: How They Work and Whether Your Business Should Try Them](https://uptrixtechnologies.com/blog/chatgpt-ads).

## What are the ways to pay for ChatGPT ads?

There are four ways to pay, based on the campaign objective you pick. According to [OpenAI's Help Center](https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics):

| Objective | Billing model | What you pay for |
|---|---|---|
| Views | CPM (cost per mille) | Every 1,000 impressions (times your ad is shown) |
| Clicks | CPC (cost per click) | Every valid click |
| Conversions | oCPC (optimised cost per click) | Every valid click, with delivery aimed at conversions |
| Conversions | oCPM (optimised cost per mille, in beta) | Every 1,000 impressions, with delivery aimed at conversions |

The key point: **you are never billed per conversion.** A conversion is an action you care about, like a purchase or lead. Conversion campaigns only tell the platform which clicks or views to go after.

[Conversion campaigns](https://help.openai.com/en/articles/20001412-conversion-optimized-campaigns) have extra requirements. You need conversion tracking set up through OpenAI's pixel (code on your website) or Conversions API (which sends events from your server), and a supported standard conversion event. Custom events aren't supported for these campaigns yet.

## How does the ChatGPT ads auction work?

OpenAI's Help Center says it uses a **relevance-weighted, second-price auction** to choose between eligible ads.

In plain terms:

- **Relevance-weighted** means your bid isn't the only thing that counts. How well your ad fits the conversation also matters, based on your landing page, headline, copy, and the context hints you write.
- **Second-price** is a standard auction format where the winner's price is set by the competition, rather than automatically being its full maximum bid.

So the cheapest way to compete is usually a better ad, not just a higher bid. Ads Manager may also show bid-strength guidance, which tells you if your bid looks competitive or is likely to limit delivery.

## How much should you bid?

For click (CPC) campaigns, OpenAI's Help Center recommends starting with a **maximum bid of $3 to $5 USD per click**. That's a starting point, not a price you'll necessarily pay.

For conversion campaigns, OpenAI says there is no recommended bid amount at this time.

You also choose a bid strategy for each ad group:

- **[Maximize results](https://help.openai.com/en/articles/20001425-maximize-results-bid-strategy).** OpenAI's platform sets and adjusts bids for you, aiming to get as many clicks or conversions as possible from your budget. OpenAI says it's selected by default for eligible new ad groups, and that it doesn't guarantee any specific cost per click, cost per acquisition, or return on ad spend.
- **Manual: Max bid.** You set your own maximum bid. Use this if you have a hard cost limit.
- **Bid Cap (conversion campaigns).** The most you're willing to bid for a conversion. OpenAI is clear that this isn't the price you're charged and isn't a guaranteed cost per acquisition.

**Our tip:** check the bid strategy on every new ad group. Because Maximize results is pre-selected, it's easy to launch without a cost limit by accident.

## How do ChatGPT ads budgets work?

You choose one of two budget types when you create a campaign:

- **Daily budget:** the average you want to spend per day, measured over seven days.
- **Campaign total budget:** the most you'll spend across the whole campaign, paced over its dates.

You can change the budget amount later. Budget type changes are limited: you can switch a campaign-total budget to daily, but not back.

Daily budgets catch people out. OpenAI's Help Center [says a single day can spend](https://help.openai.com/en/articles/20001413-daily-budgets) up to **twice** your daily budget, but a seven-day period never goes above **seven times** it. So a ₹1,000 daily budget could spend up to ₹2,000 on one day, but no more than ₹7,000 across the week.

**Minimum daily budgets vary by market and currency.** OpenAI's [campaign guide](https://help.openai.com/en/articles/20001210-create-campaigns-for-chatgpt-ads) lists them by billing currency, including $25 for USD, ₹725 for INR, £15 for GBP and €15 for EUR. Read more in our guide to [ChatGPT ads in India](https://uptrixtechnologies.com/blog/chatgpt-ads-india).

One more detail: after you pause a campaign, ads can keep running for up to 24 hours, and that spend is still billable.

## How are you billed for ChatGPT ads?

Self-serve billing is **postpaid**, according to [OpenAI's billing guide](https://help.openai.com/en/articles/20001216-billing-payment):

1. You add a billing profile and a credit card before ads can run.
2. Spend builds up as your ads deliver.
3. Your card is charged when unpaid spend reaches your account's payment threshold, and any remaining balance is charged at month end.

New accounts usually start with a lower threshold, which may rise over time with successful payments. Support won't change it manually. If a payment fails, your ads may stop until it's fixed.

Spend figures can also appear later than clicks and impressions, so a spend of zero doesn't mean nothing has been charged.

## What can't you change after launch?

Plan these before you create a campaign, because OpenAI's Help Center says they're locked afterwards:

- The **campaign objective** (views, clicks or conversions)
- The **billing model** (for example, oCPC or oCPM)
- The **conversion event** a conversion campaign optimises for
- The **budget type**, except a one-way switch from campaign total to daily

To change any of these, you create a new campaign.

## How do you judge whether the price is worth it?

OpenAI's Ads Manager reports impressions, clicks, spend, click-through rate, average cost per click, average cost per 1,000 impressions, and conversions. You can also add UTM tags (tracking codes in your link) to see ChatGPT traffic in your own analytics.

The number that matters most is **cost per conversion**: spend divided by conversions. Compare it with what the same lead or sale costs you on Google or Meta. Our [ChatGPT Ads vs Google Ads](https://uptrixtechnologies.com/blog/chatgpt-ads-vs-google-ads) guide shows how to set that benchmark, and our [paid media team](https://uptrixtechnologies.com/services/ppc) can help you read it.

**Simple test-budget arithmetic:** if you want about 100 clicks to judge a campaign, and you use OpenAI's $3 to $5 starting bid range as a rough guide, plan for around $300 to $500 in media spend. That's an illustration based on maximum bids, not a forecast. Your actual costs will depend on the auction.

## What Uptrix Technologies believes about this

We believe pricing is where most new-channel tests go wrong. Not because the channel is expensive, but because the settings are rushed.

On ChatGPT ads, that means three things: set a cost limit on purpose, set up conversion tracking before you launch, and lock in the right objective the first time. Using the [Uptrix 5S™ framework](https://uptrixtechnologies.com/uptrix-5s-framework), this is the Sequence stage: fix the setup before you Ship. Our [step-by-step setup guide](https://uptrixtechnologies.com/blog/chatgpt-ads-setup) shows how.

## Conclusion

ChatGPT ads pricing is auction-based and flexible, but it has rules that catch people out: daily budgets that can double on a single day, bid strategies that default to no cost limit, and settings you can't change later. Learn those, and your first test will be a fair one.

For the bigger picture, read [ChatGPT Ads: How They Work and Whether Your Business Should Try Them](https://uptrixtechnologies.com/blog/chatgpt-ads).

## Want a second pair of eyes on your ChatGPT ads budget?

Uptrix Technologies is a growth marketing company. One team owns strategy, execution and performance, from the first strategy call to scale. [Book a growth consultation](https://uptrixtechnologies.com/contact-us/) and we'll review your bids, budget and tracking before you launch.
