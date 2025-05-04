import React, { useEffect, useState } from 'react';
import { Building, Search } from 'lucide-react';
import useProfiles from '../../hooks/useProfiles';
import Layout from './Layout';
import Spinner from './Spinner';
import Alert from './Alert';

const UniversitiesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  
  const { 
    universities, 
    getUniversities, 
    isLoading, 
    error,
  } = useProfiles();

  useEffect(() => {
    getUniversities();
  }, [getUniversities]);

  useEffect(() => {
    if (universities) {
      if (searchTerm) {
        const filtered = universities.filter(university => 
          university.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUniversities(filtered);
      } else {
        setFilteredUniversities(universities);
      }
    }
  }, [universities, searchTerm]);

  if (isLoading) {
    return (
      <Layout>
        <div className="h-96 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Universities</h1>
        
        {error && (
          <Alert 
            type="error" 
            message={typeof error === 'string' ? error : 'Failed to load universities'}
            className="mb-6"
          />
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-neutral-500" />
              </div>
              <input
                type="text"
                placeholder="Search universities..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="divide-y divide-neutral-200">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map(university => (
                <div key={university.id} className="p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary-50 mr-3">
                      <Building size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{university.name}</h3>
                      {university.location && (
                        <p className="text-sm text-neutral-500">{university.location}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-neutral-500">
                  {searchTerm ? 'No universities found matching your search.' : 'No universities available.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UniversitiesList;