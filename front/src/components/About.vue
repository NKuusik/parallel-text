<template>
    <h1>About</h1>
    <p>Hello!</p>
    <p>This is a small web application to enable line-by-line comparison of two text files.</p>
    <p>Several strategies and filters are used for the analysis of lines.</p>
    
    <h2>Line separation</h2>
    <p>The following strategies have been implemented to separate lines in input texts:</p>
    <ul>
        <li>New line
            <ul>
                <li>simple mechanical approach that relies on the newline tags in the text.</li>
            </ul>
        </li>
        <li>Sentence (regex)
            <ul>
                <li>a more comprehensive approach that uses a number regex patterns 
                    to detect the end of a sentence.</li>
                <li>the following patterns are NOT correctly identified:
                    <ul>
                        <li>
                            mid-sentence direct speech ending with a sentence terminator, e.g. 
                            "This direct speech ends with an exclamation!" but the sentence still continues.
                        </li>
                        <li>
                            abbrevations ending with a sentence terminator that are longer than 3 characters 
                            and/or have multiple terminators. For example, "ie." is correctly identified,
                            but "ibid." or "e.g." is not.  
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>

    <h2>Filter types</h2>
    <p>The following filter options exist for line-by-line comparison:</p>
    <ul>
        <li>
            None
            <ul>
                <li>no filter, simply display the two lines.</li>
            </ul>
        </li>
        <li>
            Higlight differences
            <ul>
                <li>
                    mechanically identify parts of the line that are different and identical.
                </li>
            </ul>
        </li>
        <li>
            Display Parts of Speech
            <ul>
                <li>
                    provide information on Parts of Speech (PoS) for each word as identified by NLTK POS-tagger.
                </li>
                <li>
                    NLTK POS-tags indicating punctuation marks have been omitted.
                </li>
                <li>
                    option is only available for English-language text.
                </li>
            </ul>
        </li>
    </ul>

    <p>CLD3 is used for language detection.</p>

    <h2>Example use</h2>
    <p>In order to facilitate a quick demo of the application, 
    example mode enables to try out all functionalities using pre-loaded example texts.</p>

    <h2>Misc</h2>
    <p>Uploaded input files are not permanently stored.</p>
    <p>That being said, this software is provided "as is", without warranty of any kind, 
    express or implied, including but not limited to the warranties of merchantability, 
    fitness for a particular purpose and noninfringement.</p>

    <h2>Contact</h2>
    <p>For questions/feedback <a href="mailto:parallel.text.feedback@gmail.com">send me an email</a>.</p>
</template>