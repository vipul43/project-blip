<template>
  <div id="faq">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-expansion-panels popout focusable>
            <v-expansion-panel v-for="(item, i) in faqs" :key="i">
              <v-expansion-panel-header disable-icon-rotate>
                <template v-slot:actions>
                  <v-icon> mdi-lightbulb-on </v-icon> </template
                >{{ item.question }}</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <div v-html="item.answer" class="pa-4"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "FAQ",
  data: () => ({
    faqs: [
      {
        question: "What is Project BLiP?",
        answer: `<p>We are a Non-profitable organization that connects people to their nearest donation centers online. And keep track of the donation made at the donation center for the people till the blood work is utilized. People connected with us can know the status of their donated blood work as it goes through various locations and stages and gets an acknowledgment of their donation in Share Non-Fungible Token(NFT)(what is NFT? Read <a href="https://www.theverge.com/22310188/nft-explainer-what-is-blockchain-crypto-art-faq">here</a>) and Rewards. Users can generate a unique share NFT after each donation and share it on their social media platforms to publicize their good work.</p>`,
      },
      {
        question: "How does tracking donation work?",
        answer: `<p>You just need to signup on our <a href="https://project-blip.herokuapp.com/user/login">User Log In</a> page and search for Project BLiP associated donation centers near them on the <a href="https://project-blip.herokuapp.com/donate-blood">Donate Blood</a> page and make the donation at the center. After the donation, you need to provide basic details at the donation center like name and contact info. Within 24hrs you will receive a donation id on your provided contact info, enter the donation id on the Track Blood pop-up. Voila!! Now you can view the donations on your dashboard and track them.</p>`,
      },
      {
        question: "What do I get?",
        answer: `<ul>
                  <li>You earn Share NFT(what is NFT? Read <a href="https://www.theverge.com/22310188/nft-explainer-what-is-blockchain-crypto-art-faq">here</a>) and Rewards as you make donations.</li>
                  <li>You can also utilize the curated diet plan designed by our experts according to the type(how many types of donation? there are four) of the blood donation made and your heathfolio(complete portfolio of your health status). You take care of the good work, we take care of you!</li>
                  <li>You can get referred consultations to our doctor panel to resolve your queries and also in case of donation-related medical emergencies.</li>
                  <li>You can earn rewards points with a donation, these reward points can be redeemed to earn gifts.</li>
                </ul>`,
      },
      {
        question: "How do I make a donation?",
        answer: `<p>Just head onto our <a href="https://project-blip.herokuapp.com/user/login">User Log In</a> page and enter the details to create an account on our platform. Then head onto <a href="https://project-blip.herokuapp.com/donate-blood">Donate Blood</a> page and find Project BLiP associated centers nearest to your current location. Make a stop at the center and get the donation work done. Make sure to provide your contact details at the donation center to help us track your donation for you.</p>`,
      },
      {
        question: "How can I track my donation?",
        answer: `<p>After the blood work, you receive a unique donation id to the contact info provided by you at the donation center. Enter the donation id in the Track Blood pop-up. That&#39;s it!! You can now view your donation work in your dashboard and track it from there.</p>`,
      },
      {
        question: "What do I get by tracking my donation?",
        answer: `<p>You can view and understand various phases and locations of your blood work. This way, you will have an understanding of the impact that you are really creating by making blood work. Keeps you motivated to involve more in the donation work. The termination phase of a donation is when the blood work is effectively utilized for people in need. In tracking, you can also view the number of people the blood reached and benefitted along with the medical condition they have been diagnosed with and even the details of them if they agreed to share so.<br>There is another indirect good deed that you are performing, we closely monitor each donation work across geographical locations and collect data which can be publicly accessed at our <a href="https://project-blip.herokuapp.com/stats">Stats</a> page and using our <a href="https://api-project-blip.herokuapp.com/stats">stats</a> API, this data will further be utilized to increasing awareness in areas where the donation work is minimal and the donation requirement is maximal.</p>`,
      },
      {
        question:
          "What is the advantage of using the Project BLiP platform over normal donation?",
        answer: `<p>Project BLiP platform helps you track the good deed that you performed and gives you an acknowledgment for a wonderful human being that you have been, in the form of Share NFTs, Reward Points and keeps you healthy and in the loop by providing curated diet, professional medical support, perfect donation guidelines, and guidance and timer to keep track of your next donation cycle. All for free!! And guess what by using the platform you indirectly help to enhance the lives of many by providing us the valuable data of the donation status across geographical locations.</p>`,
      },
      {
        question: "How can I let my friends know about my donation works?",
        answer: `<p>After each donation, you can generate one Share NFT, which is uniquely and exclusively designed for you with the help of your entire portfolio, your personal details, and your profile picture. This Share NFT can be shared on social media platforms, just to boast of your donation work and also let others know about our organization and the problem we are trying to solve.<br>There is a streamlined communication medium too, for letting your friends know about us like our Instagram Handle, Facebook Page, Twitter Handle, LinkedIn page, Mailbox, and our website <a href="https://project-blip.herokuapp.com/contact">Contact</a> page.</p>`,
      },
      {
        question: "Do I need to pay for anything?",
        answer: `<p>We are a Non-profitable Orgranisation. We expect nothing from you or our partners. We just connect you to the donation center(our partners) near you and after the donation, keep track of it.</p>`,
      },
      {
        question:
          "Why is there no mobile app, which is more convenient for me?",
        answer: `<p>We are working on our mobile app, it will be out soon. We will let you know once it is out, on our website. Stay connected till then.</p>`,
      },
      {
        question: "Why am I unable to see the details of the persons saved?",
        answer: `<p>You can always see the number of persons you saved and the medical condition each of them has been diagnosed with. But you can&#39;t view the personal details of the person you saved like his Name, age, location, and contact info. When the person is really grateful for your work and has no problems disclosing their details, we show them to you. Till then we ask you to respect everyone&#39;s privacy.</p>`,
      },
      {
        question:
          "What is meant by status DONATED, REGISTERED, ASSIGNED, TRACKED, SEPERATED, TRANSFERRED, REACHED, TERMINATED?",
        answer: `<ul>
                  <li>DONATED: Blood is donated at the Project BLiP associated donation center.</li>
                  <li>ASSIGNED: The donation is assigned to someone as they entered the donation id in the Track Blood pop-up.</li>
                  <li>SEPARATED: The components of the blood have been separated.</li>
                  <li>TRANSFERRED: The blood or its components are transferred to another facility.</li>
                  <li>REACHED: The blood or its components has reached the hospital for direct use.</li>
                  <li>TERMINATED: The blood or its components are utilized to treat a person.</li>
                </ul>`,
      },
      {
        question: "Why can't I see the exact location of my donation work?",
        answer: `<p>The exact location is hidden by us to avoid misuse of the information. The location is provided only to some accuracy. And the live location is not provided, the location you view has a 4hrs-12hrs delay for safety purposes.</p>`,
      },
      {
        question: "Why is my donation not tracking?",
        answer: `<p>You must assign your account to the donation work you made at the donation center within 24hrs of the donation. In case of delay or any other discrepancy related to the <code>unable to track</code> category, please do contact us.</p>`,
      },
      {
        question: "Why is my donation tracked partially?",
        answer: `<p>The donation tracking depends on the length of the network that we have associated with. The more donation centers and hospitals get associated with us, the larger network we build. With a large network, you are likely to track your donation till termination. You are partially viewing the donation because our chain might be broken after some point. But you stay tuned and share about us, the more you share, the larger the network we build and connect the chains at later points. You can continue tracking the donation once the chain is extended by making newer connections. Our solution offers fool-proof tracking, even with no connections, we can restore tracking once the connections are made. So stay connected with us!!</p>`,
      },
    ],
  }),
  metaInfo() {
    return {
      title: "FAQ - Project BLiP",
    };
  },
};
</script>
