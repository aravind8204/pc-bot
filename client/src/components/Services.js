import React from 'react';



const Services = () => {

    const services = [
        {
          title: 'Health Insurance',
          description: 'Affordable plans that keep you and your family covered during emergencies.',
        },
        {
          title: 'Vehicle Insurance',
          description: 'Comprehensive protection for your vehicles with easy claim processes.',
        },
      ];
      
  return (
    <section className="py-16 px-6 bg-white text-center">
      <h3 className="text-3xl font-semibold text-gray-800 mb-10">Our Services</h3>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {services.map((service, index) => (
          <div key={index} className="bg-blue-100 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h4 className="text-xl font-bold text-blue-700 mb-2">{service.title}</h4>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
