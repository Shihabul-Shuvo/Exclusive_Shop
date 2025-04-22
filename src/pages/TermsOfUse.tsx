
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsOfUse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        
        <div className="prose max-w-none">
          <p>Last updated: April 19, 2025</p>
          
          <h2>1. Introduction</h2>
          <p>
            Welcome to Exclusive! These Terms of Use govern your use of our website and the services offered by us.
            By using our website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website.
          </p>
          
          <h2>2. License to Use Website</h2>
          <p>
            Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.
          </p>
          <p>
            You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.
          </p>
          
          <h2>3. Acceptable Use</h2>
          <p>You must not:</p>
          <ul>
            <li>Republish material from this website (including republication on another website)</li>
            <li>Sell, rent or sub-license material from the website</li>
            <li>Show any material from the website in public</li>
            <li>Reproduce, duplicate, copy or otherwise exploit material on our website for a commercial purpose</li>
            <li>Edit or otherwise modify any material on the website</li>
            <li>Redistribute material from this website except for content specifically and expressly made available for redistribution</li>
          </ul>
          
          <h2>4. User Content</h2>
          <p>
            In these terms and conditions, "your user content" means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to our website, for whatever purpose.
            You grant to us a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media.
          </p>
          
          <h2>5. Limited Warranties</h2>
          <p>
            We do not warrant the completeness or accuracy of the information published on this website; nor do we commit to ensuring that the website remains available or that the material on the website is kept up-to-date.
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to this website and the use of this website.
          </p>
          
          <h2>6. Limitations of Liability</h2>
          <p>
            We will not be liable to you in respect of any losses arising out of any event or events beyond our reasonable control.
            We will not be liable to you in respect of any business losses, including (without limitation) loss of or damage to profits, income, revenue, use, production, anticipated savings, business, contracts, commercial opportunities or goodwill.
          </p>
          
          <h2>7. Variation</h2>
          <p>
            We may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of our website from the date of the publication of the revised terms and conditions on our website.
          </p>
          
          <h2>8. Entire Agreement</h2>
          <p>
            These terms and conditions, together with our privacy policy, constitute the entire agreement between you and us in relation to your use of our website, and supersede all previous agreements in respect of your use of this website.
          </p>
          
          <h2>9. Law and Jurisdiction</h2>
          <p>
            These terms and conditions will be governed by and construed in accordance with the laws of [Country], and any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts of [Country].
          </p>
          
          <h2>10. Contact Us</h2>
          <p>If you have any questions about these Terms of Use, please contact us at: terms@exclusive.com</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
