// homepage.tsx
import HeroSection from "./components/HeroSection";
import Section from "./components/Section";
import { useHomepageController } from "./homepage.controller";

export const HomePage = () => {
    const controller = useHomepageController();

    return (
        <div className="w-full pb-20">
            <HeroSection />

            <div className="space-y-4">

                {controller.isLoading ? (
                    <div className="w-full flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-slate-400">Đang tải dữ liệu...</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {controller.sections.map((section, index) => (
                            <Section
                                key={section.sectionName}
                                sectionName={section.sectionName}
                                items={section.items}
                                onViewAll={() => controller.handleViewAll(section.filter)}
                                id={index === 0 ? "product-list" : undefined}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};