import React, { useState, useEffect } from 'react';
import { 
  Moon, Sun, Github, Linkedin, Mail, Phone, ExternalLink, 
  CheckCircle, Send, FolderGit2, Menu, X, ArrowUpRight, ChevronRight,
  Wrench, Layers, Compass, FileText, Plus, Trash2, Edit, Lock, Unlock, Key,
  Image as ImageIcon, ChevronLeft, UserCheck, Settings, Award, Cpu, ShieldCheck,
  Code, Layout, Smartphone, Database, Box, Activity
} from 'lucide-react';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';

// Firebase Setup
const firebaseConfig = {
  apiKey: "AIzaSyCSatFAB-stSaS5QeHZUfWI-8hHG6wS6cQ",
  authDomain: "hossam-portfolio01.firebaseapp.com",
  projectId: "hossam-portfolio01",
  storageBucket: "hossam-portfolio01.firebasestorage.app",
  messagingSenderId: "158169206892",
  appId: "1:158169206892:web:f8187e2a6c941a83e30849",
  measurementId: "G-PMMBGRPHVF"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = 'hossam-portfolio';

// Initial Seed Profile Data
const defaultProfile = {
  name: "Hossam M. Elmokabbaty",
  title: "Junior Mechanical Engineer | MEP & BIM Specialist",
  bio: "Junior Mechanical Engineer specializing in MEP systems. Experienced in MEP design following international standards (ASHRAE, NFPA, IPC) and local codes across diverse projects. Hands-on expertise in 3D BIM modeling, parametric Revit family creation, multidisciplinary clash coordination, shop drawings, and BOQ generation.",
  location: "Cairo, Egypt",
  availableForFreelance: true,
  avatar: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
  email: "hossam.elmokabbaty@example.com",
  phone: "+20 100 000 0000",
  linkedin: "#",
  github: "#"
};

// Available Lucide Icons Registry for Services Selection
const ICON_OPTIONS = [
  { id: 'Wrench', label: 'Wrench / Tools', icon: Wrench },
  { id: 'Layers', label: 'Layers / 3D BIM', icon: Layers },
  { id: 'Compass', label: 'Compass / Coordination', icon: Compass },
  { id: 'FileText', label: 'FileText / BOQ', icon: FileText },
  { id: 'Cpu', label: 'Cpu / Tech', icon: Cpu },
  { id: 'ShieldCheck', label: 'ShieldCheck / Standards', icon: ShieldCheck },
  { id: 'Code', label: 'Code / Programming', icon: Code },
  { id: 'Layout', label: 'Layout / Drafting', icon: Layout },
  { id: 'Database', label: 'Database / System', icon: Database },
  { id: 'Box', label: 'Box / 3D Element', icon: Box },
  { id: 'Activity', label: 'Activity / Analysis', icon: Activity },
];

// Helper to render dynamic Icon by ID string
const RenderIcon = ({ iconId, className = "w-8 h-8 text-blue-500" }) => {
  const found = ICON_OPTIONS.find(item => item.id === iconId);
  const IconComponent = found ? found.icon : Wrench;
  return <IconComponent className={className} />;
};

// Initial Seed Services
const defaultServices = [
  {
    id: 'service-1',
    iconId: 'Wrench',
    title: "MEP Systems Design",
    description: "Comprehensive HVAC, Plumbing, and Fire Protection system designs adhering strictly to ASHRAE, NFPA, IPC, and local Egyptian building codes."
  },
  {
    id: 'service-2',
    iconId: 'Layers',
    title: "BIM Modeling & Revit Families",
    description: "Developing LOD 300-400 3D BIM models, parametric Revit MEP family creation, and detailed spatial arrangement for mechanical components."
  },
  {
    id: 'service-3',
    iconId: 'Compass',
    title: "Multidisciplinary Coordination",
    description: "Clash detection and resolution between Mechanical, Electrical, Plumbing, Structural, and Architectural elements using Navisworks."
  },
  {
    id: 'service-4',
    iconId: 'FileText',
    title: "Shop Drawings & BOQ Generation",
    description: "Extracting precise construction-ready shop drawings, schedules, bill of quantities (BOQ), and material takeoff sheets directly from BIM models."
  }
];

// Initial Seed Skills
const defaultSkills = [
  { id: 'skill-1', name: "Autodesk Revit (MEP & Family Creation)", level: 92 },
  { id: 'skill-2', name: "AutoCAD (Shop Drawings & Drafting)", level: 95 },
  { id: 'skill-3', name: "Navisworks (Clash Coordination & 4D)", level: 85 },
  { id: 'skill-4', name: "HVAC Design (HAP / Duct & Pipe Sizing)", level: 88 },
  { id: 'skill-5', name: "Plumbing & Firefighting Systems (NFPA / IPC)", level: 86 },
  { id: 'skill-6', name: "BOQ & Quantity Take-off", level: 90 },
];

// Initial Seed Projects
const defaultProjects = [
  {
    id: 'seed-1',
    title: "Commercial Tower HVAC & MEP Design",
    category: "MEP Design",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
    description: "Full mechanical design including heat load calculations using HAP, chilled water piping layout, duct sizing, and air distribution per ASHRAE 62.1 & 90.1.",
    technologies: ["HAP", "Revit MEP", "ASHRAE", "AutoCAD"],
    demoLink: "#",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80",
        caption: "AHU Room Layout and Chilled Water Piping Model in Revit"
      },
      {
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
        caption: "Ductwork sizing and air distribution design meeting ASHRAE standard"
      }
    ]
  },
  {
    id: 'seed-2',
    title: "Hospital Complex BIM & Clash Coordination",
    category: "BIM & Coordination",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    description: "Multi-service BIM model coordination eliminating 300+ hard and soft clashes between MEP ductwork, piping runs, and structural beams using Navisworks Manage.",
    technologies: ["Revit", "Navisworks", "BIM 360", "LOD 400"],
    demoLink: "#",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
        caption: "Navisworks Clash Matrix Resolution between MEP and Structure"
      }
    ]
  },
  {
    id: 'seed-3',
    title: "Residential Development Firefighting & Plumbing",
    category: "Plumbing & Fire",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    description: "Hydraulic calculations and distribution layouts for sprinkler systems, standpipes, drainage, and domestic water supply fully aligned with NFPA 13 & 14 standards.",
    technologies: ["AutoCAD", "NFPA", "IPC", "Elite Fire"],
    demoLink: "#",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
        caption: "Sprinkler pipe network isometric view and hydraulic calculation zones"
      }
    ]
  },
  {
    id: 'seed-4',
    title: "Parametric Revit MEP Family Library & BOQs",
    category: "Revit Families",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "Creation of customized parametric Revit families (AHUs, pumps, chillers, valves) with shared parameters for automated BOQ and equipment schedule extraction.",
    technologies: ["Revit Family Editor", "Shared Parameters", "BOQ", "Dynamo"],
    demoLink: "#",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        caption: "Custom AHU Parametric Family with MEP Connector parameters"
      }
    ]
  }
];

// Image Compressor Utility to prevent Firestore 1MB document size error
const compressImage = (file, maxWidth = 800, maxHeight = 500, quality = 0.6) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalImageIndex, setActiveModalImageIndex] = useState(0);

  // Admin Access Lock
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminPinError, setAdminPinError] = useState(false);
  const ADMIN_PASSCODE = "1234";

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  // Profile Data State
  const [profile, setProfile] = useState(defaultProfile);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState(defaultProfile);

  // Services State synced with Firestore
  const [services, setServices] = useState([]);
  const [servicesModalOpen, setServicesModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({ title: '', description: '', iconId: 'Wrench' });
  const [savingService, setSavingService] = useState(false);

  // Skills State synced with Firestore
  const [skills, setSkills] = useState([]);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [skillFormData, setSkillFormData] = useState({ name: '', level: 90 });
  const [savingSkill, setSavingSkill] = useState(false);

  // Projects State synced with Cloud Firestore
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Modal State for Adding / Editing Project
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [savingProject, setSavingProject] = useState(false);
  const [compressingImage, setCompressingImage] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Form State including Gallery Items
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    category: 'MEP Design',
    description: '',
    technologies: '',
    demoLink: '#',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80', caption: 'Main Design Layout' }
    ]
  });

  // 1. Firebase Authentication Listener
  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.error("Auth error:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // 2. Real-time Cloud Firestore listener for Profile, Services, Skills, and Projects
  useEffect(() => {
    if (!user) return;

    // Listen to Profile
    const profileDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'profile', 'main');
    const unsubscribeProfile = onSnapshot(profileDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        setDoc(profileDocRef, defaultProfile);
        setProfile(defaultProfile);
      }
    }, (err) => console.error("Profile snapshot error:", err));

    // Listen to Services
    const servicesCollectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'services');
    const unsubscribeServices = onSnapshot(servicesCollectionRef, (snapshot) => {
      const docsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (docsData.length === 0) {
        defaultServices.forEach(async (srv) => {
          await setDoc(doc(servicesCollectionRef, srv.id), srv);
        });
        setServices(defaultServices);
      } else {
        setServices(docsData);
      }
    }, (err) => console.error("Services snapshot error:", err));

    // Listen to Skills
    const skillsCollectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'skills');
    const unsubscribeSkills = onSnapshot(skillsCollectionRef, (snapshot) => {
      const docsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (docsData.length === 0) {
        defaultSkills.forEach(async (s) => {
          await setDoc(doc(skillsCollectionRef, s.id), s);
        });
        setSkills(defaultSkills);
      } else {
        setSkills(docsData);
      }
    }, (err) => console.error("Skills snapshot error:", err));

    // Listen to Projects
    const projectsCollectionRef = collection(db, 'artifacts', appId, 'public', 'data', 'projects');
    const unsubscribeProjects = onSnapshot(projectsCollectionRef, (snapshot) => {
      const docsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (docsData.length === 0) {
        defaultProjects.forEach(async (p) => {
          await setDoc(doc(projectsCollectionRef, p.id), p);
        });
        setProjects(defaultProjects);
      } else {
        setProjects(docsData);
      }
      setLoadingProjects(false);
    }, (error) => {
      console.error("Firestore snapshot error:", error);
      setLoadingProjects(false);
    });

    return () => {
      unsubscribeProfile();
      unsubscribeServices();
      unsubscribeSkills();
      unsubscribeProjects();
    };
  }, [user]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const categories = ["All", "MEP Design", "BIM & Coordination", "Plumbing & Fire", "Revit Families"];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  // Admin Unlock Verification
  const handleAdminAuthSubmit = (e) => {
    e.preventDefault();
    if (adminPinInput === ADMIN_PASSCODE) {
      setIsAdmin(true);
      setAdminModalOpen(false);
      setAdminPinInput('');
      setAdminPinError(false);
    } else {
      setAdminPinError(true);
    }
  };

  // Open Profile Edit Modal
  const handleOpenEditProfile = () => {
    setProfileFormData({ ...profile });
    setProfileModalOpen(true);
  };

  // Save Profile to Firestore
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user || !isAdmin) return;
    setSavingProfile(true);

    try {
      const profileDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'profile', 'main');
      await setDoc(profileDocRef, profileFormData);
      setProfileModalOpen(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setSavingProfile(false);
    }
  };

  // Local Avatar Image Upload
  const handleAvatarFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompressingImage(true);
      try {
        const compressedBase64 = await compressImage(file, 600, 600, 0.7);
        setProfileFormData(prev => ({ ...prev, avatar: compressedBase64 }));
      } catch (err) {
        console.error("Avatar compression error:", err);
      } finally {
        setCompressingImage(false);
      }
    }
  };

  // Services Admin Management Handlers
  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setServiceFormData({ title: '', description: '', iconId: 'Wrench' });
    setServicesModalOpen(true);
  };

  const handleOpenEditService = (srv, e) => {
    e.stopPropagation();
    setEditingServiceId(srv.id);
    setServiceFormData({ title: srv.title, description: srv.description, iconId: srv.iconId || 'Wrench' });
    setServicesModalOpen(true);
  };

  const handleDeleteService = async (id, e) => {
    e.stopPropagation();
    if (!isAdmin) return;
    if (window.confirm("Are you sure you want to delete this competency/service?")) {
      try {
        await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'services', id));
      } catch (err) {
        console.error("Error deleting service:", err);
      }
    }
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!user || !isAdmin) return;
    setSavingService(true);

    try {
      const servicesRef = collection(db, 'artifacts', appId, 'public', 'data', 'services');
      if (editingServiceId) {
        await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'services', editingServiceId), {
          title: serviceFormData.title,
          description: serviceFormData.description,
          iconId: serviceFormData.iconId
        });
      } else {
        await addDoc(servicesRef, {
          title: serviceFormData.title,
          description: serviceFormData.description,
          iconId: serviceFormData.iconId
        });
      }
      setServicesModalOpen(false);
    } catch (err) {
      console.error("Error saving service:", err);
    } finally {
      setSavingService(false);
    }
  };

  // Skill Management Handlers
  const handleOpenAddSkill = () => {
    setEditingSkillId(null);
    setSkillFormData({ name: '', level: 85 });
    setSkillsModalOpen(true);
  };

  const handleOpenEditSkill = (skill, e) => {
    e.stopPropagation();
    setEditingSkillId(skill.id);
    setSkillFormData({ name: skill.name, level: skill.level });
    setSkillsModalOpen(true);
  };

  const handleDeleteSkill = async (id, e) => {
    e.stopPropagation();
    if (!isAdmin) return;
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'skills', id));
      } catch (err) {
        console.error("Error deleting skill:", err);
      }
    }
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!user || !isAdmin) return;
    setSavingSkill(true);

    try {
      const skillsRef = collection(db, 'artifacts', appId, 'public', 'data', 'skills');
      if (editingSkillId) {
        await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'skills', editingSkillId), {
          name: skillFormData.name,
          level: Number(skillFormData.level)
        });
      } else {
        await addDoc(skillsRef, {
          name: skillFormData.name,
          level: Number(skillFormData.level)
        });
      }
      setSkillsModalOpen(false);
    } catch (err) {
      console.error("Error saving skill:", err);
    } finally {
      setSavingSkill(false);
    }
  };

  // Open Modal to Create Project
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setSaveError('');
    setProjectFormData({
      title: '',
      category: 'MEP Design',
      description: '',
      technologies: 'Revit MEP, AutoCAD, ASHRAE',
      demoLink: '#',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80', caption: 'Primary Revit Model / Layout' }
      ]
    });
    setProjectModalOpen(true);
  };

  // Open Modal to Edit Project
  const handleOpenEditProject = (proj, e) => {
    e.stopPropagation();
    setEditingProjectId(proj.id);
    setSaveError('');

    let galleryItems = [];
    if (proj.gallery && Array.isArray(proj.gallery) && proj.gallery.length > 0) {
      galleryItems = proj.gallery;
    } else if (proj.image) {
      galleryItems = [{ url: proj.image, caption: 'Main Project Image' }];
    }

    setProjectFormData({
      title: proj.title,
      category: proj.category,
      description: proj.description,
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies,
      demoLink: proj.demoLink || '#',
      gallery: galleryItems
    });
    setProjectModalOpen(true);
  };

  // Gallery Item Handlers
  const handleAddGalleryItem = () => {
    setProjectFormData(prev => ({
      ...prev,
      gallery: [...prev.gallery, { url: '', caption: '' }]
    }));
  };

  const handleRemoveGalleryItem = (index) => {
    setProjectFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== index)
    }));
  };

  const handleUpdateGalleryItem = (index, field, value) => {
    setProjectFormData(prev => {
      const newGallery = [...prev.gallery];
      newGallery[index] = { ...newGallery[index], [field]: value };
      return { ...prev, gallery: newGallery };
    });
  };

  const handleGalleryImageFileUpload = async (index, file) => {
    if (!file) return;
    setCompressingImage(true);
    setSaveError('');
    try {
      const compressedBase64 = await compressImage(file, 800, 500, 0.6);
      handleUpdateGalleryItem(index, 'url', compressedBase64);
    } catch (err) {
      console.error("Gallery Compression Error:", err);
      setSaveError("Error compressing image file.");
    } finally {
      setCompressingImage(false);
    }
  };

  // Delete Project from Cloud Firestore
  const handleDeleteProject = async (id, e) => {
    e.stopPropagation();
    if (!isAdmin) return;
    if (window.confirm("Are you sure you want to delete this project permanently?")) {
      try {
        await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'projects', id));
      } catch (err) {
        console.error("Error deleting document:", err);
      }
    }
  };

  // Save Project (Add or Update) to Cloud Firestore
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!user || !isAdmin) return;

    if (!projectFormData.gallery || projectFormData.gallery.length === 0 || !projectFormData.gallery[0].url) {
      setSaveError("Please add at least one valid image to the gallery.");
      return;
    }

    setSavingProject(true);
    setSaveError('');

    const techArray = projectFormData.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const mainCoverImage = projectFormData.gallery[0].url;

    try {
      const projectsRef = collection(db, 'artifacts', appId, 'public', 'data', 'projects');

      const projectDataToSave = {
        title: projectFormData.title,
        category: projectFormData.category,
        image: mainCoverImage,
        gallery: projectFormData.gallery,
        description: projectFormData.description,
        technologies: techArray,
        demoLink: projectFormData.demoLink,
        updatedAt: new Date().toISOString()
      };

      if (editingProjectId) {
        await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'projects', editingProjectId), projectDataToSave);
      } else {
        await addDoc(projectsRef, {
          ...projectDataToSave,
          createdAt: new Date().toISOString()
        });
      }
      setProjectModalOpen(false);
    } catch (err) {
      console.error("Error saving project:", err);
      if (err.message && err.message.includes('longer than 1048487 bytes')) {
        setSaveError('Gallery images total size exceeds 1MB. Please remove some images or upload smaller files.');
      } else {
        setSaveError('Failed to save project. Please try again.');
      }
    } finally {
      setSavingProject(false);
    }
  };

  return (
    <div dir="ltr" className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-extrabold shadow-lg shadow-blue-500/20">
              {profile.name ? profile.name.charAt(0) : 'H'}
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
            <a href="#services" className="hover:text-blue-500 transition-colors">Services</a>
            <a href="#projects" className="hover:text-blue-500 transition-colors">Portfolio ({projects.length})</a>
            <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full transition-all duration-200 ${darkMode ? 'bg-slate-900 text-amber-400' : 'bg-slate-200 text-slate-700'}`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin Controls */}
            {!isAdmin ? (
              <button
                onClick={() => setAdminModalOpen(true)}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 border border-slate-700 transition-all"
                title="Admin Control Panel Lock"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Admin Access
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenEditProfile}
                  className="px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
                  title="Edit Personal Information & Photo"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
                <button
                  onClick={handleOpenAddProject}
                  className="px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Project
                </button>
                <button
                  onClick={() => setIsAdmin(false)}
                  className="p-2 text-xs rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  title="Lock Admin Mode"
                >
                  <Unlock className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-4 pt-2 pb-6 border-b transition-colors ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex flex-col space-y-3 font-medium text-sm pt-2">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-blue-500/10">About</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-blue-500/10">Services</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-blue-500/10">Portfolio</a>
              <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-blue-500/10">Skills</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-blue-500/10">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 text-center lg:text-left">
              {profile.availableForFreelance && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Open for MEP & BIM Engineering Opportunities
                </div>
              )}
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                Hi, I'm <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">{profile.name}</span>
                <br />
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold opacity-90 font-mono mt-3 block text-blue-400">
                  {profile.title}
                </span>
              </h1>

              <p className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {profile.bio}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#projects"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <FolderGit2 className="w-5 h-5" />
                  Explore Portfolio
                </a>

                {isAdmin ? (
                  <button
                    onClick={handleOpenEditProfile}
                    className="px-6 py-3.5 rounded-xl font-semibold border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 flex items-center gap-2"
                  >
                    <Settings className="w-5 h-5" />
                    Edit Profile Details & Photo
                  </button>
                ) : (
                  <a
                    href="#contact"
                    className={`px-6 py-3.5 rounded-xl font-semibold border transition-all duration-200 flex items-center gap-2 ${darkMode ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-200' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'}`}
                  >
                    <Mail className="w-5 h-5 text-blue-500" />
                    Get In Touch
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                {isAdmin && (
                  <button
                    onClick={handleOpenEditProfile}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-slate-900/90 text-amber-400 hover:bg-amber-500 hover:text-white backdrop-blur-md shadow-xl transition-all"
                    title="Change Profile Photo & Bio"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                <div className={`relative rounded-3xl overflow-hidden border p-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg">{profile.name}</h3>
                    <p className="text-xs text-blue-400 font-medium">Mechanical Engineer • {profile.location}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== SERVICES / CORE COMPETENCIES SECTION (WITH FULL CLOUD ADMIN EDITING) ===== */}
      <section id="services" className={`py-20 ${darkMode ? 'bg-slate-900/40' : 'bg-slate-100/70'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16 max-w-7xl mx-auto">
            <div className="text-center sm:text-left">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Core Competencies</h2>
              <p className="text-3xl sm:text-4xl font-bold">MEP Engineering & BIM Solutions</p>
            </div>

            {isAdmin && (
              <button
                onClick={handleOpenAddService}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                Add Competency / Service
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className={`p-6 rounded-2xl border relative group transition-all duration-300 hover:-translate-y-1.5 ${darkMode ? 'bg-slate-900/80 border-slate-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10' : 'bg-white border-slate-200 hover:border-blue-500/30 hover:shadow-lg'}`}
              >
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-80 group-hover:opacity-100 z-10">
                    <button
                      onClick={(e) => handleOpenEditService(srv, e)}
                      className="p-1.5 rounded-md bg-slate-800 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                      title="Edit Service Card"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteService(srv.id, e)}
                      className="p-1.5 rounded-md bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Service Card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-blue-500/10 inline-block mb-4">
                  <RenderIcon iconId={srv.iconId} className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{srv.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {srv.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-1">Interactive Gallery Portfolio</h2>
              <p className="text-3xl sm:text-4xl font-bold">MEP Projects ({filteredProjects.length})</p>
            </div>

            {isAdmin && (
              <button
                onClick={handleOpenAddProject}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 hover:opacity-95"
              >
                <Plus className="w-5 h-5" />
                Add Project & Photos
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-blue-600 text-white' : darkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-200 text-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loadingProjects ? (
            <div className="flex justify-center items-center py-20 text-slate-400 gap-3">
              <span className="animate-pulse text-blue-500 font-bold">Loading Projects & Galleries from Cloud...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => {
                const galleryCount = (project.gallery && Array.isArray(project.gallery)) ? project.gallery.length : 1;
                const coverImg = project.gallery?.[0]?.url || project.image;

                return (
                  <div
                    key={project.id}
                    className={`group rounded-2xl overflow-hidden border relative transition-all duration-300 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 hover:shadow-xl'}`}
                  >
                    {/* Admin Action Buttons */}
                    {isAdmin && (
                      <div className="absolute top-3 right-3 z-20 flex gap-2">
                        <button
                          onClick={(e) => handleOpenEditProject(project, e)}
                          className="p-2 rounded-lg bg-slate-900/80 text-blue-400 hover:bg-blue-600 hover:text-white backdrop-blur-md transition-colors shadow-md"
                          title="Edit Project & Photos"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteProject(project.id, e)}
                          className="p-2 rounded-lg bg-slate-900/80 text-rose-400 hover:bg-rose-600 hover:text-white backdrop-blur-md transition-colors shadow-md"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div className="relative overflow-hidden h-64 cursor-pointer" onClick={() => { setSelectedProject(project); setActiveModalImageIndex(0); }}>
                      <img
                        src={coverImg}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Multi-Photo Indicator Badge */}
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                        <span>{galleryCount} {galleryCount === 1 ? 'Photo' : 'Photos'}</span>
                      </div>

                      <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs flex items-center gap-2">
                          View Gallery & Drawings
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{project.category}</span>
                      <h3 className="text-xl font-bold mt-1 mb-3">{project.title}</h3>
                      <p className={`text-sm line-clamp-2 mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/40">
                        {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2.5 py-1 rounded-md font-mono ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ===== SKILLS SECTION (WITH CLOUD ADMIN MANAGEMENT) ===== */}
      <section id="skills" className={`py-20 ${darkMode ? 'bg-slate-900/40' : 'bg-slate-100/70'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 max-w-4xl mx-auto">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-1">Technical Proficiency</h2>
              <p className="text-3xl sm:text-4xl font-bold">Engineering Tools & Standards</p>
            </div>

            {isAdmin && (
              <button
                onClick={handleOpenAddSkill}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                Add New Skill
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <div key={skill.id} className={`p-5 rounded-xl border relative group transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-80 group-hover:opacity-100">
                    <button
                      onClick={(e) => handleOpenEditSkill(skill, e)}
                      className="p-1.5 rounded-md bg-slate-800 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                      title="Edit Skill"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteSkill(skill.id, e)}
                      className="p-1.5 rounded-md bg-slate-800 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex justify-between items-center mb-2 pr-14 sm:pr-0">
                  <span className="font-bold text-sm sm:text-base">{skill.name}</span>
                  <span className="text-xs font-mono text-blue-400 font-bold">{skill.level}%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">Contact Me</h2>
            <p className="text-3xl sm:text-4xl font-bold">Let's coordinate your next engineering project</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Info Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</div>
                      <a href={`mailto:${profile.email}`} className="font-semibold hover:text-blue-400">{profile.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Phone / WhatsApp</div>
                      <a href={`tel:${profile.phone}`} className="font-semibold hover:text-emerald-400">{profile.phone}</a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/40">
                  <div className={`text-xs mb-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Professional Profiles</div>
                  <div className="flex items-center gap-3">
                    <a href={profile.linkedin || '#'} className={`p-3 rounded-xl border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-blue-600' : 'bg-slate-100 border-slate-200 hover:bg-blue-600 hover:text-white'}`}>
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={profile.github || '#'} className={`p-3 rounded-xl border transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-blue-600' : 'bg-slate-100 border-slate-200 hover:bg-blue-600 hover:text-white'}`}>
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleFormSubmit} className={`p-8 rounded-2xl border space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                {formSubmitted && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Your inquiry has been sent successfully! I will reply as soon as possible.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Eng. Ahmed Ali"
                      className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@company.com"
                      className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subject / Project Scope</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="e.g. BIM Coordination & MEP Shop Drawings Request"
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Project Details</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your project scope, building type, system requirements, or BIM LOD requirements..."
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                >
                  <Send className="w-5 h-5" />
                  Send Inquiry
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* ===== EDIT / ADD SERVICE MODAL (ADMIN ONLY) ===== */}
      {servicesModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button
              onClick={() => setServicesModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-400" />
              {editingServiceId ? 'Edit Competency Card' : 'Add New Competency'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Card Title</label>
                <input
                  type="text"
                  required
                  value={serviceFormData.title}
                  onChange={(e) => setServiceFormData({...serviceFormData, title: e.target.value})}
                  placeholder="e.g. MEP Systems Design"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Choose Icon</label>
                <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-2 border border-slate-800 rounded-xl bg-slate-950/50">
                  {ICON_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    const isSelected = serviceFormData.iconId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setServiceFormData({...serviceFormData, iconId: opt.id})}
                        className={`p-2.5 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${isSelected ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-slate-800 hover:bg-slate-800 text-slate-400'}`}
                      >
                        <IconComp className="w-5 h-5" />
                        <span className="text-[9px] truncate w-full text-center">{opt.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Description</label>
                <textarea
                  rows={3}
                  required
                  value={serviceFormData.description}
                  onChange={(e) => setServiceFormData({...serviceFormData, description: e.target.value})}
                  placeholder="Comprehensive HVAC, Plumbing, and Fire Protection system designs..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={savingService}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:opacity-95"
                >
                  {savingService ? "Saving..." : (editingServiceId ? 'Update Card' : 'Add Card')}
                </button>
                <button
                  type="button"
                  onClick={() => setServicesModalOpen(false)}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== EDIT SKILL MODAL (ADMIN ONLY) ===== */}
      {skillsModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button
              onClick={() => setSkillsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" />
              {editingSkillId ? 'Edit Skill' : 'Add New Skill'}
            </h3>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Skill / Software Name</label>
                <input
                  type="text"
                  required
                  value={skillFormData.name}
                  onChange={(e) => setSkillFormData({...skillFormData, name: e.target.value})}
                  placeholder="e.g. Autodesk Revit MEP"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase text-slate-400">Proficiency Level (%)</label>
                  <span className="text-xs font-mono font-bold text-blue-400">{skillFormData.level}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={skillFormData.level}
                  onChange={(e) => setSkillFormData({...skillFormData, level: e.target.value})}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={savingSkill}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:opacity-95"
                >
                  {savingSkill ? "Saving..." : (editingSkillId ? 'Update Skill' : 'Add Skill')}
                </button>
                <button
                  type="button"
                  onClick={() => setSkillsModalOpen(false)}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== EDIT PROFILE MODAL (ADMIN ONLY) ===== */}
      {profileModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button
              onClick={() => setProfileModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-400" />
              Edit Personal Profile & Contact Details
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileFormData.name}
                    onChange={(e) => setProfileFormData({...profileFormData, name: e.target.value})}
                    placeholder="Hossam M. Elmokabbaty"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Job Title</label>
                  <input
                    type="text"
                    required
                    value={profileFormData.title}
                    onChange={(e) => setProfileFormData({...profileFormData, title: e.target.value})}
                    placeholder="Junior Mechanical Engineer | MEP & BIM Specialist"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Bio & Summary</label>
                <textarea
                  rows={4}
                  required
                  value={profileFormData.bio}
                  onChange={(e) => setProfileFormData({...profileFormData, bio: e.target.value})}
                  placeholder="Junior Mechanical Engineer specializing in MEP..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              {/* PROFILE PHOTO SECTION */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 space-y-3">
                <span className="text-xs font-bold uppercase text-blue-400 block">Profile Photo</span>
                
                <div className="flex items-center gap-4">
                  <img src={profileFormData.avatar} alt="Avatar preview" className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      value={profileFormData.avatar}
                      onChange={(e) => setProfileFormData({...profileFormData, avatar: e.target.value})}
                      placeholder="Paste Image URL (https://...)"
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                    />
                    <label className="inline-block cursor-pointer text-xs text-blue-400 hover:underline">
                      Or Upload Photo File from Device
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Email Address</label>
                  <input
                    type="email"
                    value={profileFormData.email}
                    onChange={(e) => setProfileFormData({...profileFormData, email: e.target.value})}
                    placeholder="hossam@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={profileFormData.phone}
                    onChange={(e) => setProfileFormData({...profileFormData, phone: e.target.value})}
                    placeholder="+20 100 000 0000"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Location</label>
                  <input
                    type="text"
                    value={profileFormData.location}
                    onChange={(e) => setProfileFormData({...profileFormData, location: e.target.value})}
                    placeholder="Cairo, Egypt"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="checkbox"
                      checked={profileFormData.availableForFreelance}
                      onChange={(e) => setProfileFormData({...profileFormData, availableForFreelance: e.target.checked})}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Show "Open for Opportunities" Badge</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-sm hover:opacity-95"
                >
                  {savingProfile ? "Saving Profile..." : "Save Profile to Cloud"}
                </button>
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== ADMIN LOGIN MODAL ===== */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button
              onClick={() => setAdminModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 mb-2 font-semibold text-xs uppercase tracking-wider">
              <Key className="w-4 h-4" />
              Owner Authentication
            </div>
            <h3 className="text-xl font-bold mb-2">Unlock Admin Controls</h3>
            <p className="text-xs text-slate-400 mb-6">Enter your owner passcode to manage competencies, skills, profile details, photos, and project galleries.</p>

            <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Owner Passcode</label>
                <input
                  type="password"
                  required
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  placeholder="Enter passcode (Default: 1234)"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-amber-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
                {adminPinError && (
                  <p className="text-xs text-rose-500 mt-1">Incorrect passcode. Default is 1234.</p>
                )}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-sm hover:opacity-95"
                >
                  Unlock Admin Mode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== ADD / EDIT PROJECT WITH MULTI-IMAGE GALLERY (ADMIN ONLY) ===== */}
      {projectModalOpen && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button
              onClick={() => setProjectModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-500" />
              {editingProjectId ? 'Edit Cloud Project & Photos' : 'Add New Cloud Project & Multi-Image Gallery'}
            </h3>

            {saveError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {saveError}
              </div>
            )}

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectFormData.title}
                  onChange={(e) => setProjectFormData({...projectFormData, title: e.target.value})}
                  placeholder="e.g. Commercial Mall HVAC & Plumbing Design"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Category</label>
                  <select
                    value={projectFormData.category}
                    onChange={(e) => setProjectFormData({...projectFormData, category: e.target.value})}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option value="MEP Design">MEP Design</option>
                    <option value="BIM & Coordination">BIM & Coordination</option>
                    <option value="Plumbing & Fire">Plumbing & Fire</option>
                    <option value="Revit Families">Revit Families</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Tools & Codes (Comma-separated)</label>
                  <input
                    type="text"
                    value={projectFormData.technologies}
                    onChange={(e) => setProjectFormData({...projectFormData, technologies: e.target.value})}
                    placeholder="Revit MEP, Navisworks, HAP, NFPA 13"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1 text-slate-400">Description & Scope</label>
                <textarea
                  rows={3}
                  required
                  value={projectFormData.description}
                  onChange={(e) => setProjectFormData({...projectFormData, description: e.target.value})}
                  placeholder="Describe the MEP design scope, codes applied (ASHRAE/NFPA), and BIM LOD..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              {/* MULTI-IMAGE GALLERY MANAGEMENT SECTION */}
              <div className="pt-2 border-t border-slate-800/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    Project Gallery & Captions ({projectFormData.gallery.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddGalleryItem}
                    className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Photo
                  </button>
                </div>

                <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                  {projectFormData.gallery.map((item, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border relative ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400">Photo #{idx + 1} {idx === 0 && '(Main Cover)'}</span>
                        {projectFormData.gallery.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryItem(idx)}
                            className="p-1 text-rose-400 hover:text-rose-500 text-xs"
                            title="Remove Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div className="sm:col-span-8 space-y-2">
                          <input
                            type="url"
                            value={item.url}
                            onChange={(e) => handleUpdateGalleryItem(idx, 'url', e.target.value)}
                            placeholder="Image URL (e.g. https://...)"
                            className={`w-full px-3 py-1.5 rounded-lg border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                          />
                          <input
                            type="text"
                            value={item.caption}
                            onChange={(e) => handleUpdateGalleryItem(idx, 'caption', e.target.value)}
                            placeholder="Add caption (e.g. Revit 3D HVAC Piping Layout)"
                            className={`w-full px-3 py-1.5 rounded-lg border text-xs outline-none ${darkMode ? 'bg-slate-900 border-slate-800 text-amber-300' : 'bg-white border-slate-200 text-amber-600'}`}
                          />
                        </div>

                        <div className="sm:col-span-4 flex flex-col items-center justify-center">
                          {item.url ? (
                            <img src={item.url} alt={`Preview ${idx}`} className="w-full h-16 object-cover rounded-lg border border-slate-700" />
                          ) : (
                            <div className="w-full h-16 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-[10px] text-slate-500">
                              No Image
                            </div>
                          )}
                          <label className="mt-1 cursor-pointer text-[10px] text-blue-400 hover:underline">
                            Upload File
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleGalleryImageFileUpload(idx, e.target.files[0])}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={savingProject || compressingImage}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:opacity-95 flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  {savingProject ? "Saving..." : (editingProjectId ? 'Update Project & Gallery' : 'Save & Publish Gallery to Cloud')}
                </button>
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className={`px-5 py-3 rounded-xl font-semibold text-sm ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== PROJECT DETAIL VIEW MODAL WITH GALLERY SLIDER ===== */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-3xl rounded-2xl overflow-hidden border shadow-2xl ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 text-white hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery Main Display Area */}
            {(() => {
              const galleryList = (selectedProject.gallery && Array.isArray(selectedProject.gallery) && selectedProject.gallery.length > 0)
                ? selectedProject.gallery
                : [{ url: selectedProject.image, caption: 'Main Project Image' }];

              const currentImg = galleryList[activeModalImageIndex] || galleryList[0];

              return (
                <div>
                  <div className="relative bg-slate-950 h-72 sm:h-96 flex items-center justify-center overflow-hidden">
                    <img
                      src={currentImg.url}
                      alt={selectedProject.title}
                      className="w-full h-full object-contain"
                    />

                    {/* Navigation Arrows for Multi Image */}
                    {galleryList.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveModalImageIndex((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1))}
                          className="absolute left-3 p-2 rounded-full bg-slate-950/70 text-white hover:bg-slate-900"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setActiveModalImageIndex((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0))}
                          className="absolute right-3 p-2 rounded-full bg-slate-950/70 text-white hover:bg-slate-900"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Image Caption Bar */}
                    {currentImg.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs text-center border-t border-slate-800">
                        💬 {currentImg.caption}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {galleryList.length > 1 && (
                    <div className="flex gap-2 p-3 bg-slate-950/40 border-b border-slate-800/60 overflow-x-auto">
                      {galleryList.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveModalImageIndex(idx)}
                          className={`relative rounded-lg overflow-hidden flex-shrink-0 w-16 h-12 border-2 transition-all ${activeModalImageIndex === idx ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          <img src={item.url} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="p-6">
              <span className="text-xs font-bold text-blue-400 uppercase">{selectedProject.category}</span>
              <h3 className="text-2xl font-bold mt-1 mb-3">{selectedProject.title}</h3>
              <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(selectedProject.technologies) ? selectedProject.technologies : []).map((t, i) => (
                  <span key={i} className="px-3 py-1 text-xs rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer className={`py-8 border-t text-center text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
        <p>All rights reserved © {new Date().getFullYear()} — Eng. {profile.name}</p>
      </footer>

    </div>
  );
}