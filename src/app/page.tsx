import { StashLink } from '@/components/ui/link';
import { stashClient } from '@/lib/stash-client';
import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
    title: 'Discover the Best Independent Hotels - Earn Free Nights',
    description:
        'Earn points for free nights at unique, independent boutique hotels. Stash is the top-rated loyalty program for independent hotels and the inspired travelers who love them.'
};

const Home: React.FC = async () => {
    const destinations = await stashClient.getTopDestinations();

    return (
        <div className="flex py-8 custom:py-16 gap-8 custom:gap-24 flex-col custom:flex-row w-full max-w-[500px] custom:w-full custom:max-w-full">
            <div className="flex flex-col gap-4 custom:gap-8">
                <h1 className="font-bold text-stash text-[40px] custom:text-5xl">
                    Travel far, stay local.
                </h1>
                <p className="text-slate-500 text-base custom:text-[18px] leading-[20px] custom:leading-[26px] w-full custom:w-[400px]">
                    No matter where you go, you belong at an independent hotel.
                    Stash Hotel Rewards is the free and easy loyalty program for
                    travelers who love independent and boutique hotels.
                </p>
            </div>
            <div className="flex flex-col">
                <p className="text-sm text-slate-600 mb-2">
                    Popular Destinations
                </p>
                <ul className="columns-3">
                    {destinations.map((destination) => {
                        return (
                            <li
                                key={destination.slug}
                                className="leading-[20px] py-[10px] mr-[30px]"
                            >
                                <StashLink
                                    href={`/destination/${destination.slug}`}
                                >
                                    {destination.name}
                                </StashLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Home;
