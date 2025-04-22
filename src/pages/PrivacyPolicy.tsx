
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p>Last updated: April 19, 2025</p>
          
          <h2>Introduction</h2>
          <p>
            Welcome to Exclusive! We respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your personal data when you visit our website
            and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2>The Data We Collect About You</h2>
          <p>
            Personal data means any information about an individual from which that person can be identified.
            It does not include data where the identity has been removed (anonymous data).
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          
          <ul>
            <li>Identity Data includes first name, last name, username or similar identifier.</li>
            <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
            <li>Financial Data includes payment card details.</li>
            <li>Transaction Data includes details about payments to and from you and other details of products you have purchased from us.</li>
            <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version.</li>
            <li>Profile Data includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
          </ul>
          
          <h2>How We Use Your Personal Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
          
          <h2>Cookies</h2>
          <p>
            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
          </p>
          
          <h2>Changes to the Privacy Policy</h2>
          <p>
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
            You are advised to review this privacy policy periodically for any changes.
          </p>
          
          <h2>Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at: privacy@exclusive.com</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
