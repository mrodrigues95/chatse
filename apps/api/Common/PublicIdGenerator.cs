using System.Text.RegularExpressions;
using NanoidDotNet;

namespace Api.Common;

/// <summary>
/// Base class used for generating a <see cref="PublicId" />.
/// </summary>
/// <remarks>
/// Inspired by https://planetscale.com/blog/why-we-chose-nanoids-for-planetscales-api
/// </remarks>
public static class PublicIdGenerator
{
    public const string DefaultAlphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
    public const int DefaultSize = 12;
    public const string DefaultPrefixRegex = @"^[a-zA-Z]+_$";

    public static string Generate(string alphabet = DefaultAlphabet, int size = DefaultSize)
        => Nanoid.Generate(alphabet, size);

    public static string GenerateByPrefix(string prefix, string alphabet = DefaultAlphabet, int size = DefaultSize)
    {
        var re = new Regex(DefaultPrefixRegex);

        if (!re.IsMatch(prefix))
        {
            throw new ArgumentException($"{prefix} does not conform to the expected format." +
                "A prefix must only contain letters followed by an underscore, e.g. usr_");
        }

        return $"{prefix}{Generate(alphabet, size)}";
    }
}
