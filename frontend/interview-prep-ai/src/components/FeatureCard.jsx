import { motion } from "framer-motion";

const FeatureCard = ({ feature, index }) => {
  // Framer Motion variants for scroll animation
  const cardVariants = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-left border border-gray-100 hover:-translate-y-1"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
      transition={{ delay: index * 0.2 }}
    >
      <div className="text-cyan-500 text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {feature.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
